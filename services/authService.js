const jwt = require('jsonwebtoken');

const authService = () => {
  const issue = (payload) => jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '6h' });
  
 
  const protect = async (req, res, next) => {
    const token = req.headers.authorization;
    console.log("token====>", token);
    if (token) {
      try {

        jwt.verify(token, process.env.JWT_KEY, async function (err, decoded) {
          try {
        
              const userId = jwt.verify(token, process.env.JWT_KEY);
              console.log("Valid Token -->", userId);
              req.body.merchantId = userId.id;
              next();
            
          } catch (error) {
            console.error(error);
            res.send({ code: 401, msg: 'Not Authorized' });
          }

        });


      } catch (error) {
        console.error(error);
        res.send({ code: 401, msg: 'Not Authorized' });
      }
    }
    if (!token) {
      res.send({ code: 401, msg: 'Not Authorized' });
    }
  };

  return {
    issue,
    protect,
  };
};

export default authService;