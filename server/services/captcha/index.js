/**
 * Created by iAboShosha on 4/15/17.
 */

import {captchaSiteKey, captchaSecretKey, env} from '../../config'
import https  from 'https';


function verifyRecaptcha(req, res, next) {
  var key = req.body['g-recaptcha-response'];
  https.get("https://www.google.com/recaptcha/api/siteverify?secret=" + captchaSecretKey + "&response=" + key, function (hRes) {
    var data = "";
    hRes.on('data', function (chunk) {
      data += chunk.toString();
    });
    hRes.on('end', function () {
      try {
        var parsedData = JSON.parse(data);
        if (parsedData.success) next();
        else {
          res.status(409).json(parsedData)
        }
      } catch (e) {
        res.status(500).json('captcha api parsing error')
      }
    });
  });
}


export default  verifyRecaptcha;



