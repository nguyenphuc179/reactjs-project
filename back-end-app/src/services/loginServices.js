import jwt from 'jsonwebtoken'

import models from '../database/models';

export const login = (loginRequest) => {
  console.log(loginRequest,'phuc_login');
  const loginType = loginRequest.loginType;

  if (loginType == 'customer') return customerLogin(loginRequest);
  if (loginType == 'staff') return staffLogin(loginRequest);

  return { success: false, reason: `type ${loginType} is not support` }
}

export const verify = async (token) => {
  if (!token) return { success: false, message: 'no token provided' }

  ////////////////
  let newToken = token;
  console.log(token,'tokenXXXXXX')
  // let newToken = token.split(' ')[1];
  // console.log(newToken);

  return new Promise((s, r) =>
  //s({ success: !err, message: 'verify fail', decoded })
    jwt.verify(newToken, "TOKEN_SECRET", (err, decoded) => {
      console.log(err,'errrrrrr')
      console.log(decoded,'decodedddddddd')
      return s({ success: !err, message: 'verify fail', decoded });
    })
  )
}
const genAuthToken = ({ id, email, first_name, last_name, userType }) => {
  // using jwt token here
  return jwt.sign({ id, email, first_name, last_name, userType }, "TOKEN_SECRET", { expiresIn: '1800s' });
}

const staffLogin = async ({ email }) => {
  const model = await models.staffs.findOne({ where: { email } })

  if (!model) {
    return { success: false, reason: `login for staff fail` }
  }
  let abc = genAuthToken({ id: model.dataValues.staff_id, ...model.dataValues, userType: 'staff' });
  console.log(abc,'genAUthorrrrr');
  return {
    token: abc,
    staffInfo: model,
    success: true
  }
}

const customerLogin = async ({ email }) => {
  const model = await models.customers.findOne({ where: { email } })

  if (!model) {
    return { success: false, reason: `login for staff fail` }
  }

  let abc = genAuthToken({ id: model.dataValues.customer_id, ...model.dataValues, userType: 'customer' });
  console.log(abc,'genAUthorrrrr');
  return {
    token: abc,
    customerInfo: model,
    success: true
  }
}
