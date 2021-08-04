// must use absolute path
import models from '../database/models';

// should implement the bussiness logic here
export const requestNewOrder = async ({
  // product info
  product_id, quantity, discount,
  // buyer/seller info
  customer_id, store_id, staff_id },
) => {
  const product = await models.products.findOne({
    attributes: ['list_price'],
    where: { product_id: product_id },
  });
  console.log(product_id);
  if (!product) {
    throw new Error('product not found');
  }

  const list_price = product.list_price;
  const defaultOrder = {
    order_status: 0,
    order_date: new Date(),
    required_date: new Date(),
    shipped_date: new Date(),
  };

  // Note: if have multiple command, must wrap inside the transaction:
  // https://sequelize.org/master/manual/transactions.html
  // this project I use the

  const transaction = await models.sequelize.transaction();
  try {
    const order = await models.orders.create({
      ...defaultOrder,
      customer_id,
      store_id,
      staff_id,
    }, { transaction });
    const order_id = order.order_id;

    await models.order_items.create({
      order_id, product_id, quantity, list_price, discount,
    }, { transaction });

    await transaction.commit();

    // do the next task here: like send email....
    return { order_id };
  } catch (err) {
    await transaction.rollback();
  }
};

export const requestRemoveProductFromOrder = async ({
  order_id, product_id,
},
) => {
  const deleted = await models.order_items.destroy({
    where: { product_id, order_id },
  });

  return {
    success: deleted,
  };
};

export const requestUpdateProductForOrder = async ({ order_id, product_id, quantity, discount, list_price }) => {
  const [updated] = await models.order_items.update(
    { quantity, list_price, discount }, {
    where: { product_id, order_id },
  });

  if (!updated) {
    throw new Error('error on update order item');
  }

  return {
    success: updated,
  };
};

/// PHUCNT18

export const requestAddProductToOrder111 = async (bodyData) => {
  let model = bodyData.map(res => {
    let model = {
      product_id: res.product_id,
      customer_id: 1,
      order_status: 1,
      order_date: '2021-11-12',
      required_date: '2021-11-12',
      shipped_date: '2021-11-12',
      store_id: 1,
      staff_id: 2,
      quantity: res.quality,
      discount: 0,
      list_price: res.list_price,
    }
    return model;
  });


  model.forEach(async (item) => {
    // add new order 
    const result = await models.orders.create({
      customer_id: item.customer_id, order_status: item.order_status, order_date: item.order_date, required_date: item.required_date, shipped_date: item.shipped_date
      , store_id: item.store_id, staff_id: item.staff_id
    });

    // add new order item
    await models.order_items.create({
      order_id: result.order_id, product_id: item.product_id, quantity: item.quantity, list_price: item.list_price, discount: item.discount
    });

  });

  // const result = await models.orders.bulkCreate(model);
  return { success: true };
};




export const requestAddProductToOrder = async ({
  order_id, product_id, quantity, discount,
},
) => {
  const product = await models.products.findOne({
    attributes: ['list_price'],
    where: { product_id: product_id },
  });
  console.log(product_id);
  if (!product) {
    throw new Error('product not found');
  }

  const list_price = product.list_price;

  const oderItem = await models.order_items.findOne({
    attributes: ['quantity'],
    where: { product_id, order_id },
  });
  const hasProductOrdered = !!oderItem;

  if (!hasProductOrdered) {
    // add new order item
    await models.order_items.create({ order_id, product_id, quantity, list_price, discount });
    return { success: true };
  }

  // update order item base on product id
  const [updated] = await models.order_items.update(
    { quantity: oderItem.quantity + quantity, list_price, discount }, {
    where: { product_id, order_id },
  });

  if (!updated) {
    throw new Error('error on update order item');
  }

  return { success: true };
};

export const getOrderById = async ({ order_id }) => {
  const order = await models.orders.findOne({
    where: { order_id: order_id },
    include: [
      {
        model: models.customers,
        as: 'customer',

      },
      {
        model: models.order_items,
        as: 'order_items',
        include: [
          {
            model: models.products,
            as: 'product',
          },
        ],
      },
      {
        model: models.stores,
        as: 'store',
      },
      {
        model: models.staffs,
        as: 'staff',
      },
    ],
  });

  return order;
};


export const getOrderByCustomerId = async ({ customer_id }) => {
  const orders = await models.orders.findAll({
    where: { customer_id },
    raw: true,
    nest: true,
    include: [
      {
        model: models.stores,
        as: 'store',
      },
      {
        model: models.staffs,
        as: 'staff',
      },
    ],
  });

  return orders;
};


