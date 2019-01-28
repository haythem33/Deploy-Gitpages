const express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const app = express();
const router = require('express').Router();
const nodemailer = require("nodemailer");
const port = process.env.port || 4000;
/*const fs = require('fs');
var htmlstream = fs.createReadStream("./sendemail.html");*/
const uuidV4 = require('uuid/v4');
var request = require('request');
var http = require('http');
const Window = require('window');


//importation des models//

var Consultant = require('./../models/consultant');
var ConsultantModel = mongoose.model('consultant', Consultant);
var Company = require('./../models/company');
var CompanyModel = mongoose.model('company', Company);
var User = require('./../models/user');
var UserModel = mongoose.model('user', User);
// function Sending mail Consultant
function sendMailConsultant(email, code) {
  var htmlSend = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8"> <!-- utf-8 works for most cases -->
    <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
    <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->
    <style type="text/css">
      /* What it does: Remove spaces around the email design added by some email clients. */
      /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
      html,
      body {
        margin: 0;
        padding: 0;
        height: 100% !important;
        width: 100% !important;
      }

      /* What it does: Stops email clients resizing small text. */
      * {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }

      /* What it does: Forces Outlook.com to display emails full width. */
      .ExternalClass {
        width: 100%;
      }

      /* What it does: Stops Outlook from adding extra spacing to tables. */
      table,
      td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }

      /* What it does: Fixes webkit padding issue. */
      table {
        border-spacing:0 !important;
      }
      .ExternalClass,
      .ExternalClass * {
        line-height: 100%;
      }

      /* What it does: Fix for Yahoo mail table alignment bug. */
      table {
        border-collapse: collapse;
        margin: 0 auto;
      }

      /* What it does: Uses a better rendering method when resizing images in IE. */
      img {
        -ms-interpolation-mode:bicubic;
      }

      /* What it does: Overrides styles added when Yahoo's auto-senses a link. */
      .yshortcuts a {
        border-bottom: none !important;
      }
        /* What it does: Overrides blue, underlined link auto-detected by iOS Mail. */
      /* Create a class for every link style needed; this template needs only one for the link in the footer. */
      .mobile-link--footer a {
        color: #666666 !important;
      }

      /* What it does: Overrides styles added images. */
      img {
        border:0 !important;
        outline:none !important;
        text-decoration:none !important;
      }
      /* Media Queries */
      @media screen and (max-device-width: 600px), screen and (max-width: 600px) {

        /* What it does: Overrides email-container's desktop width and forces it into a 100% fluid width. */
        .email-container {
          width: 100% !important;
        }
        /* What it does: Forces images to resize to the width of their container. */
        img[class="fluid"],
        img[class="fluid-centered"] {
          width: 100% !important;
          max-width: 100% !important;
          height: auto !important;
          margin: auto !important;
        }
        /* And center justify these ones. */
        img[class="fluid-centered"] {
          margin: auto !important;
        }
        /* What it does: Forces table cells into full-width rows. */
        td[class="stack-column"],
        td[class="stack-column-center"] {
          display: block !important;
          width: 100% !important;
          direction: ltr !important;
        }
        /* And center justify these ones. */
        td[class="stack-column-center"] {
          text-align: center !important;
        }

         /* Data Table Styles */
         /* What it does: Hides table headers */
         td[class="data-table-th"] {
           display: none !important;
         }
         /* What it does: Change the look and layout of the remaining td's */
         td[class="data-table-td"],
         td[class="data-table-td-title"] {
          display: block !important;
          width: 100% !important;
          border: 0 !important;
         }
         /* What it does: Changes the appearance of the first td in each row */
         td[class="data-table-td-title"] {
           font-weight: bold;
           color: #333333;
          padding: 10px 0 0 0 !important;
           border-top: 2px solid #eeeeee !important;
         }
         /* What it does: Changes the appearance of the other td's in each row */
         td[class="data-table-td"] {
          padding: 5px 0 0 0 !important
         }
         /* What it does: Provides a visual divider between table rows. In this case, a bit of extra space. */
         td[class="data-table-mobile-divider"] {
          display: block !important;
          height: 20px;
         }
         /* END Data Table Styles */
      }

    </style>
  </head>
  <body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" bgcolor="#007bff" style="margin:0; padding:0; -webkit-text-size-adjust:none; -ms-text-size-adjust:none;">
  <table cellpadding="0" cellspacing="0" border="0" height="100%" width="100%" bgcolor="#007bff" style="border-collapse:collapse;"><tr><td>

    <!-- Visually Hidden Preheader Text : BEGIN -->
    <div style="display:none;font-size:1px;color:#007bff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide: all;">
      (Optional) This text will appear in the inbox preview, but not the email body.
    </div>
    <!-- Visually Hidden Preheader Text : END -->

    <!-- Email wrapper : BEGIN -->
    <table border="0" width="600" cellpadding="0" cellspacing="0" align="center" style="width:600px; margin: auto;" class="email-container">
      <tr>
        <td>

          <!-- Logo + Links : BEGIN -->
          <table border="0" width="100%" cellpadding="0" cellspacing="0">
            <tr><td height="5" style="font-size: 0; line-height: 0;">&nbsp;</td></tr>
            <tr>
              <td valign="middle" width="150" style="padding:5px 0; text-align:left; line-height: 1;" class="stack-column-center">

              </td>
              <td valign="middle" style="padding:5px 0; text-align:right; line-height:1.1; font-family: sans-serif; font-size: 13px; color: #999999;" class="stack-column-center">

              </td>
            </tr>
            <tr><td height="5" style="font-size: 0; line-height: 0;">&nbsp;</td></tr>
          </table>
          <!-- Logo + Links : END -->

          <!-- Main Email Body : BEGIN -->
          <table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="#007bff">

            <!-- Single Fluid Image, No Crop : BEGIN -->
            <tr>

              <td valign="middle" align="center">
                <p style="color:white">Hello ,
  Welcome to ConsultantFlow! Your account is almost ready to use. Simply confirm your email address below, and start now!
  </p>
  </td>

              </tr>
              <tr>
              <td style="border-radius: 3px; background: #007bff; text-align: center;">
                                  <a  href="http://localhost:4000/auth/consultant/confirmation/${code}" style="background: blue; border: 15px solid #007bff; margin-left:150px;margin-right:150px;padding:10px;color: #ffffff; font-family: sans-serif; font-size: 15px; line-height: 1; text-align: center; text-decoration: none; display: block; border-radius: 3px;">
                                    <b><!--[if mso]>&nbsp;&nbsp;&nbsp;&nbsp;<![endif]-->Click To confirm<!--[if mso]>&nbsp;&nbsp;&nbsp;&nbsp;<![endif]--></b>
                                  </a>
                                </td>
                                </tr>
            <!-- Single Fluid Image, No Crop : END -->

            <!-- Full Width, Fluid Column : BEGIN -->

            <!-- Full Width, Fluid Column : END -->

            <!-- 2 Columns -> Stacked Columns : BEGIN -->

                            </table>

                          <!-- Second Column : END -->
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
<script src="auth.js"></script>
  </body>
  </html>
  `;
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'consultantflow@gmail.com',
      pass: 'haythem123456789'
    }
  });
  var mailOptions = {
    from: 'consultantflow@gmail.com',
    to: email,
    subject: 'Confirmation',
    html: htmlSend
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email Send :', info);
    }
  })

}

// function Sending mail Company //
function sendMail(email, code) {
  var htmlSend = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8"> <!-- utf-8 works for most cases -->
    <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
    <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->
    <style type="text/css">
      /* What it does: Remove spaces around the email design added by some email clients. */
      /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
      html,
      body {
        margin: 0;
        padding: 0;
        height: 100% !important;
        width: 100% !important;
      }

      /* What it does: Stops email clients resizing small text. */
      * {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }

      /* What it does: Forces Outlook.com to display emails full width. */
      .ExternalClass {
        width: 100%;
      }

      /* What it does: Stops Outlook from adding extra spacing to tables. */
      table,
      td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }

      /* What it does: Fixes webkit padding issue. */
      table {
        border-spacing:0 !important;
      }
      .ExternalClass,
      .ExternalClass * {
        line-height: 100%;
      }

      /* What it does: Fix for Yahoo mail table alignment bug. */
      table {
        border-collapse: collapse;
        margin: 0 auto;
      }

      /* What it does: Uses a better rendering method when resizing images in IE. */
      img {
        -ms-interpolation-mode:bicubic;
      }

      /* What it does: Overrides styles added when Yahoo's auto-senses a link. */
      .yshortcuts a {
        border-bottom: none !important;
      }
        /* What it does: Overrides blue, underlined link auto-detected by iOS Mail. */
      /* Create a class for every link style needed; this template needs only one for the link in the footer. */
      .mobile-link--footer a {
        color: #666666 !important;
      }

      /* What it does: Overrides styles added images. */
      img {
        border:0 !important;
        outline:none !important;
        text-decoration:none !important;
      }
      /* Media Queries */
      @media screen and (max-device-width: 600px), screen and (max-width: 600px) {

        /* What it does: Overrides email-container's desktop width and forces it into a 100% fluid width. */
        .email-container {
          width: 100% !important;
        }
        /* What it does: Forces images to resize to the width of their container. */
        img[class="fluid"],
        img[class="fluid-centered"] {
          width: 100% !important;
          max-width: 100% !important;
          height: auto !important;
          margin: auto !important;
        }
        /* And center justify these ones. */
        img[class="fluid-centered"] {
          margin: auto !important;
        }
        /* What it does: Forces table cells into full-width rows. */
        td[class="stack-column"],
        td[class="stack-column-center"] {
          display: block !important;
          width: 100% !important;
          direction: ltr !important;
        }
        /* And center justify these ones. */
        td[class="stack-column-center"] {
          text-align: center !important;
        }

         /* Data Table Styles */
         /* What it does: Hides table headers */
         td[class="data-table-th"] {
           display: none !important;
         }
         /* What it does: Change the look and layout of the remaining td's */
         td[class="data-table-td"],
         td[class="data-table-td-title"] {
          display: block !important;
          width: 100% !important;
          border: 0 !important;
         }
         /* What it does: Changes the appearance of the first td in each row */
         td[class="data-table-td-title"] {
           font-weight: bold;
           color: #333333;
          padding: 10px 0 0 0 !important;
           border-top: 2px solid #eeeeee !important;
         }
         /* What it does: Changes the appearance of the other td's in each row */
         td[class="data-table-td"] {
          padding: 5px 0 0 0 !important
         }
         /* What it does: Provides a visual divider between table rows. In this case, a bit of extra space. */
         td[class="data-table-mobile-divider"] {
          display: block !important;
          height: 20px;
         }
         /* END Data Table Styles */
      }

    </style>
  </head>
  <body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" bgcolor="#007bff" style="margin:0; padding:0; -webkit-text-size-adjust:none; -ms-text-size-adjust:none;">
  <table cellpadding="0" cellspacing="0" border="0" height="100%" width="100%" bgcolor="#007bff" style="border-collapse:collapse;"><tr><td>

    <!-- Visually Hidden Preheader Text : BEGIN -->
    <div style="display:none;font-size:1px;color:#007bff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide: all;">
      (Optional) This text will appear in the inbox preview, but not the email body.
    </div>
    <!-- Visually Hidden Preheader Text : END -->

    <!-- Email wrapper : BEGIN -->
    <table border="0" width="600" cellpadding="0" cellspacing="0" align="center" style="width:600px; margin: auto;" class="email-container">
      <tr>
        <td>

          <!-- Logo + Links : BEGIN -->
          <table border="0" width="100%" cellpadding="0" cellspacing="0">
            <tr><td height="5" style="font-size: 0; line-height: 0;">&nbsp;</td></tr>
            <tr>
              <td valign="middle" width="150" style="padding:5px 0; text-align:left; line-height: 1;" class="stack-column-center">

              </td>
              <td valign="middle" style="padding:5px 0; text-align:right; line-height:1.1; font-family: sans-serif; font-size: 13px; color: #999999;" class="stack-column-center">

              </td>
            </tr>
            <tr><td height="5" style="font-size: 0; line-height: 0;">&nbsp;</td></tr>
          </table>
          <!-- Logo + Links : END -->

          <!-- Main Email Body : BEGIN -->
          <table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="#007bff">

            <!-- Single Fluid Image, No Crop : BEGIN -->
            <tr>

              <td valign="middle" align="center">
                <p style="color:white">Hello ,
  Welcome to ConsultantFlow! Your account is almost ready to use. Simply confirm your email address below, and start now!
  </p>
  </td>

              </tr>
              <tr>
              <td style="border-radius: 3px; background: #007bff; text-align: center;">
                                  <a  href="http://localhost:4000/auth/company/confirmation/${code}" style="background: blue; border: 15px solid #007bff; margin-left:150px;margin-right:150px;padding:10px;color: #ffffff; font-family: sans-serif; font-size: 15px; line-height: 1; text-align: center; text-decoration: none; display: block; border-radius: 3px;">
                                    <b><!--[if mso]>&nbsp;&nbsp;&nbsp;&nbsp;<![endif]-->Click To confirm<!--[if mso]>&nbsp;&nbsp;&nbsp;&nbsp;<![endif]--></b>
                                  </a>
                                </td>
                                </tr>
            <!-- Single Fluid Image, No Crop : END -->

            <!-- Full Width, Fluid Column : BEGIN -->

            <!-- Full Width, Fluid Column : END -->

            <!-- 2 Columns -> Stacked Columns : BEGIN -->

                            </table>

                          <!-- Second Column : END -->
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
<script src="auth.js"></script>
  </body>
  </html>
  `;
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'consultantflow@gmail.com',
      pass: 'haythem123456789'
    }
  });
  var mailOptions = {
    from: 'consultantflow@gmail.com',
    to: email,
    subject: 'Confirmation',
    html: htmlSend
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email Send :', info);
    }
  })

}






// Enregistrement nouveau consultant //
router.post('/register/consultant', async (req, res) => {
 const resultRegister = await ConsultantModel.findOne({ email: req.body.email });
 const resultCompany = await CompanyModel.findOne({companyemail: req.body.email});
 if (!resultRegister && !resultCompany) {
   var user = new UserModel();

     var consultant = new ConsultantModel();
     req.body.code = uuidV4();
     consultant.code = req.body.code
     req.body.statut = "not active";
     consultant.statut = req.body.statut;
     consultant.profiltitle = req.body.profiltitle;
     consultant.category = req.body.category;
    consultant.username = req.body.username;
    consultant.email = req.body.email;
    req.body.password = bcrypt.hashSync(req.body.password);
    consultant.password = req.body.password;
    consultant.save((err, doc) => {
      if (!err) {
        sendMailConsultant(consultant.email, consultant.code);
        res.send({ message: "a new consultant is successfully added", status: 200 });
        user.consul = consultant._id;
        user.username = consultant.username;
        user.email = consultant.email;
        user.save();
       consultant.user = user._id;
       consultant.save();
      }
    })
    } else {
        res.send({ message: "email already exists !!!", status: 500 })

      }


});

// Enregistrement nouvelle société //
router.post('/register/company', async (req, res) => {
  const resultRegister = await CompanyModel.findOne({ companyemail: req.body.companyemail });
  const resultConsultant = await ConsultantModel.findOne({email: req.body.companyemail})
  if (!resultRegister && !resultConsultant) {
    var company = new CompanyModel();
    var user = new UserModel();
     req.body.code = uuidV4();
    company.code = req.body.code;
    company.companyname = req.body.companyname;
    req.body.companystatut = "not active";
    company.companystatut = req.body.companystatut;
    company.companyemail = req.body.companyemail;
    req.body.companypassword = bcrypt.hashSync(req.body.companypassword);
    company.companypassword = req.body.companypassword;

     company.save((err, doc) => {
       if (!err) {
        sendMail(company.companyemail,company.code);
        res.send({ message: "a new company is successfully added", status: 200 });
        user.comp = company._id;
        user.username = company.companyname
        user.email = company.companyemail
        user.save();
       }
    })
    } else {
      res.send({ message: "email already exists !!!", status: 500 })
    }

});
// Activation du compte company
router.get('/company/confirmation/:code', async (req, res) => {
const setCompany = await CompanyModel.findOneAndUpdate(req.params.code,{$set: {companystatut : "active"}})
const getCompany = await CompanyModel.findOne({code: req.params.code});

res.redirect('http://localhost:4200/home');

});
//login Company

// Activation compte Consultant
router.get('/consultant/confirmation/:code', async (req,res)=> {
  const setConsultant = await ConsultantModel.findOneAndUpdate(req.params.code, {$set: {statut : "active"}});

  res.redirect('http://localhost:4200/home');
});
// login Consultant && company
router.post('/login', async (req,res)=> {
const  resultLoginConsultant = await ConsultantModel.findOne({ email: req.body.loginEmail });
 const  resultLoginCompany  = await CompanyModel.findOne({companyemail: req.body.loginEmail});
  if (resultLoginConsultant && bcrypt.compareSync(req.body.loginPassword, resultLoginConsultant.password) && resultLoginConsultant.statut === 'active') {
    var user = await UserModel.findOne({email : req.body.loginEmail});
    res.send({message: 'consultant active' , Token : jwt.sign({data : resultLoginConsultant, User : user}, 'user')});

  }
  if (resultLoginCompany && bcrypt.compareSync(req.body.loginPassword, resultLoginCompany.companypassword) && resultLoginCompany.companystatut === 'active') {
    var user = await UserModel.findOne({email : req.body.loginEmail});
    res.send({message: 'Company active', Token : jwt.sign({data : resultLoginCompany, User : user}, 'user')});
  } else {
    res.send({message: 'error'})
}

})


module.exports = router;

