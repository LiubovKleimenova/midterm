const nodemailer = require('nodemailer');
module.exports = (db) => {
// *********** HELPER FUNCTIONS FOR USER ROUTES ************
  const getAllCats = function () {
    return db.query(`SELECT * FROM cats;`)
    .then(res => res.rows)
    // .catch(err => console.error('query error', err.stack));
  }
  const getAllUsers = function () {
    return db.query(`SELECT * FROM users;`)
    .then(res => res.rows[0] )
    // .catch(err => console.error('query error', err.stack));
  }
  const getFavourites = function () {
    return db.query(`
    SELECT * FROM cats
    JOIN favourites ON cats.id = cat_id
    WHERE favourites.user_id = 2;`)
    .then(res => res.rows )
  }
  const filterBySearch = function(options) {
    const queryParams = [];
    const whereClauses = [];
    let queryString = `
    SELECT *
    FROM cats
    `;
  if (options.minimum_fee && options.maximum_fee) {
    queryParams.push(`${options.minimum_fee}`);
    queryParams.push(`${options.options.maximum_fee}`);
    whereClauses.push(`fee >= $${queryParams.length - 1} AND fee <= $${queryParams.length} `);
  }
  if (options.region) {
    queryParams.push(`%${options.region}%`);
    whereClauses.push(`region = $${queryParams.length} `);
  }
  if (options.size) {
    queryParams.push(options.size);
    whereClauses.push(`size = $${queryParams.length} `);
  }
  if (options.species) {
    queryParams.push(`${options.species}`);
    whereClauses.push(`species >= $${queryParams.length}`);
  }
  if (whereClauses.length) {
    queryString += `WHERE ${whereClauses.join(' AND ')}`;
  }
    queryString += `
    ORDER BY fee
    LIMIT 10;
    `;
    // 6
    return db.query(queryString, queryParams)
    .then(res => res.rows);
  }
// *********** HELPER FUNCTIONS FOR ADMIN ROUTES ************
  const getMyCats = function () {
    return db.query(`
    SELECT * FROM cats
    WHERE owner_id = 2;`)
    .then(res => res.rows )
}
const getMessages = function () {
  return db.query(`
  SELECT * FROM cats
  WHERE owner_id = 2;`)
  .then(res => res.rows )
}
// email sending function
// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(to, subject, text) {
  // Generate test SMTP service account from ethereal.email
  // create reusable transporter object for host configuration
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'stevencschoi87@gmail.com', // generated ethereal user
      pass: '' // generated ethereal password
    }
  });
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Meowzza 👻" <stevencschoi87@gmail.com>', // sender address
    to: `${to}`, // list of receivers
    subject: `${subject}`, // Subject line
    text: `${text}` // plain text body
    // html: "<p>This is a test!</p>" // html body
  });
  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
  return {getAllCats, getAllUsers, getFavourites, filterBySearch, getMessages, getMyCats, sendEmail};
};
