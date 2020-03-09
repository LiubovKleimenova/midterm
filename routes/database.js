const nodemailer = require('nodemailer');
module.exports = (db) => {
// *********** HELPER FUNCTIONS FOR USER ROUTES & ADMIN ROUTES ************
  const getAllCats = function () {
    return db.query(`SELECT * FROM cats;`)
    .then(res => res.rows)
    .catch(err => console.error('query error', err.stack));
  }
  const getAllUsers = function () {
    return db.query(`SELECT * FROM users;`)
    .then(res => res.rows[0] )
    // .catch(err => console.error('query error', err.stack));
  }
  const getFavourites = function (userId) {
    return db.query(`
    SELECT * FROM cats
    JOIN favourites ON cats.id = cat_id
    WHERE favourites.user_id = $1
    `, [userId])
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
    queryParams.push(`${options.maximum_fee}`);
    whereClauses.push(`fee >= $${queryParams.length - 1} AND fee <= $${queryParams.length} `);
  } else if (options.minimum_fee) {
    queryParams.push(`${options.minimum_fee}`);
    whereClauses.push(`fee >= $${queryParams.length}`);
  } else if (options.maximum_fee) {
    queryParams.push(`${options.maximum_fee}`);
    whereClauses.push(`fee <= $${queryParams.length} `);
  }
  if (options.region) {
    queryParams.push(`%${options.region}%`);
    whereClauses.push(`region = $${queryParams.length} `);
  }
  if (options.size) {
    queryParams.push(options.size);
    whereClauses.push(`size = $${queryParams.length} `);
  }
  // **** Uncomment if we want to filter by species ****
  // if (options.species) {
  //   queryParams.push(`${options.species}`);
  //   whereClauses.push(`species = $${queryParams.length}`);
  // }
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

  const createMsgPost = function (message) {
    return db.query(`
    INSERT INTO messages (receiver_id, cat_id, sender_id, message)
    VALUES ($1, $2, $3)
    RETURNING *;
    `, [message.receiver_id, message.cat_id, message.message])
    .then(res => res.rows )
  }

  const login =  function(userId) {
    return db.query(`
    SELECT * FROM users
    WHERE id = $1
    `, [userId])
    .then(res => res.rows )
  }

  const getMessages = function (userId) {
    return db.query(`
    SELECT * FROM messages
    WHERE receiver_id = $1 OR sender_id = $1
    ORDER BY cat_id, id
    `, [userId])
    .then(res => res.rows )
  }
// *********** HELPER FUNCTIONS FOR ADMIN ROUTES ONLY************
  const getMyCats = function (userId) {
    return db.query(`
    SELECT * FROM cats
    WHERE id = $1
    `, [userId])
    .then(res => res.rows )
}

// *********** HELPER FUNCTIONS FOR SENDING EMAILS ************

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(to, subject, text) {
  // create reusable transporter object for host configuration
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // gmail server
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'stevenspamlol@gmail.com', // please enter email address
      pass: '' // please enter password
    }
  });
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Meowzza 👻" <stevenspamlol@gmail.com>', // sender address
    to: `${to}`, // list of receivers
    subject: `${subject}`, // Subject line
    text: `${text}` // plain text body
    // html: "<p>This is a test!</p>" // html body
  });
  console.log("Message sent: %s", info.messageId);
}
  return {getAllCats, getAllUsers, filterBySearch, getMessages, getMyCats, sendEmail, getFavourites, createMsgPost, login};
};

