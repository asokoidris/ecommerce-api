// /* eslint-disable */

// export default ({ name, body, url, cta }) => `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta http-equiv="X-UA-Compatible" content="IE=edge">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <link rel="stylesheet" href="index.css">
//   <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
//   <title>Welcome to smartzee</title>
//   <style type="text/css">
//     html {
//       width: 100%;
//     }

//     body {
//       background-color: #fff;
//       margin: 0 auto;
//       padding: 0;
//     }
//     .ReadMsgBody {
//       width: 100%;
//       background-color: #fff;
//     }
//     .ExternalClass {
//       width: 100%;
//       background-color: #fff;
//     }
//     a {
//       color: white;
//       text-decoration: none;
//       font-weight: 400;
//       font-style: normal;
//     }
//     a:hover {
//       color: white;
//       text-decoration: none;
//       font-weight: 400;
//       font-style: normal;
//     }

//     .cta:hover {
//       background-color: #08A860 !important;
//     }

//     .sm {
//       width: 50px;
//     }

//     .smLogo {
//       width: 20px;
//       height: 20px;
//       margin: 0 20px;
//     }

//     table {
//       border-collapse: collapse;
//       max-width: 600px;
//     }
// </style>
// </head>
// <body>

// <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#fff" style="padding: 0; margin: 0 auto;">
//   <!-- START LOGO-->
//   <tr>
//     <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
//         <div class="" style="width: 550px; text-align: left; margin: 40px 0 0 0;">
//           <img class="img_scale" src="https://i.imgur.com/aStOPrS.png" width="150" height="30" alt="image" border="0" style="display: block; margin-left: -5px;" />
//         </div>
//     </td>
//   </tr>
//   <!-- END LOGO-->
//   <!-- START HEADER IMAGE-->
//   <tr>
//     <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
//         <div class="" style="width: 550px; text-align: center; margin: 20px 0 0 0;">
//           <img class="img_scale" src="https://i.imgur.com/jhmfVQg.png" width="550" height="250" alt="image" border="0" style="display: block; margin: 0; background-color: #fff;" />
//         </div>
//     </td>
//   </tr>
//   <!-- END HEADER IMAGE-->

//   <!-- START MESSAGE-->
//   <tr>
//     <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
//         <div class="" style="width: 550px; text-align: left; margin: 58px 0 0 0;">
//           <p style="color: #10618B; font-weight: 700; font-size: 18px; margin: 5px 0;">Hi there,</p>
//         </div>
//     </td>
//   </tr>
//    <tr>
//     <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
//         <div class="" style="width: 550px; text-align: left; margin: 20px 0 0 0;">
//           <p style="color: #616564; font-size: 16px; margin: 5px 0;">Welcome to smartzee,</p>
//         </div>
//     </td>
//   </tr>
//   <tr>
//     <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
//         <div class="" style="width: 550px; text-align: left; margin: 14px 0 0 0;">
//           <p style="color: #616564; font-size: 16px; margin: 5px 0;">
//             We know you have awesome items and
//           </p>
//         </div>
//     </td>
//   </tr>
//   <tr>
//     <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
//         <div class="" style="width: 550px; text-align: left; margin: 14px 0 0 0;">
//           <p style="color: #616564; font-size: 16px; margin: 5px 0;">
//             You don't have the luxury of owning all the data and market research you need but you want to do more?
//             smartzee's all about bridging the accessibility gap and connecting you to your needs.
//           </p>
//         </div>
//     </td>
//   </tr>
//   <tr>
//     <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
//         <div class="" style="width: 550px; text-align: left; margin: 14px 0 0 0;">
//           <p style="color: #616564; font-size: 16px; margin: 5px 0;">
//             Now, let's get right into it so you can make the most of your smartzee account!
//           </p>
//         </div>
//     </td>
//   </tr>
//   <tr>
//     <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
//         <div class="" style="width: 550px; text-align: left; margin: 14px 0 0 0;">
//           <p style="color: #10618B; font-size: 16px; font-weight: 700; margin: 5px 0;">Account Verification</p>
//         </div>
//     </td>
//   </tr>
//   <tr>
//     <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
//         <div class="" style="width: 550px; text-align: left; margin: 14px 0 0 0;">
//           <p style="color: #616564; font-size: 16px; margin: 5px 0;">
//             <a href="${url}" style="color: #10618B;">Verify your account</a> <br>
//             We are very much concerned about your safety and that of other users.
//             You need to input your NIN, BVN, personal details and a profile picture.
//           </p>
//         </div>
//     </td>
//   </tr>
//   <tr>
//     <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
//         <div class="" style="width: 550px; text-align: left; margin: 14px 0 0 0;">
//           <p style="color: #616564; font-size: 16px; margin: 5px 0;">
//             Do that and you'll be off to a great start. We'll be giving you tips and advice to make your .
//           </p>
//         </div>
//     </td>
//   </tr>
//   <tr>
//     <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
//         <div class="" style="width: 550px; text-align: left; margin: 14px 0 0 0;">
//           <p style="color: #616564; font-size: 16px; margin: 5px 0;">
//             If you need help with anything, mail us at <a href="mailto:support@smartzee.com" style="color: #10618B;">support@smartzee.com</a>
//           </p>
//         </div>
//     </td>
//   </tr>
//   <tr>
//     <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
//         <div class="" style="width: 550px; text-align: left; margin: 14px 0 0 0;">
//           <p style="color: #616564; font-size: 16px; margin: 5px 0;">
//             Cheers,
//           </p>
//           <p style="color: #10618B; font-size: 16px; margin: 5px 0;">
//             The smartzee Team.
//           </p>
//         </div>
//     </td>
//   </tr>
//   <tr>
//     <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
//         <div class="" style="width: 550px; text-align: center; margin: 100px 0 0 0;">
//           <a href="${url}"  class="cta" style="cursor: pointer; font-weight: 700; padding: 18px 206px; background-color: #08A05C; border-radius: 7px; color: #ffffff; text-decoration: none;">${cta}</a>
//         </div>
//     </td>
//   </tr>
//   <!-- END MESSAGE-->

//   <!-- START OF FOOTER-->
//   <tr>
//     <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff"><div class="div_scale" style="width:600px;">
//         <div class="" style="width: 550px; text-align: center; margin: 160px 0 0 0;">
//           <img class="img_scale" src="https://i.imgur.com/pd1kVNe.png" width="450" height="100" alt="image" border="0" style="display: block; margin: 0 auto; background-color: #fff;" />
//         </div>
//     </td>
//   </tr>
//   <tr>
//     <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
//         <div class="" style="width: 550px; text-align: center; margin: 75px 0 0 0;">
//           <p style="color: #000; font-weight: 700; font-size: 16px; margin: 5px 0;">
//           </p>
//           <p style="color: #000; font-size: 16px; margin: 5px 0;">
//           </p>
//           <p style="color: #000; font-size: 16px; margin: 5px 0;">
//           </p>
//         </div>
//     </td>
//   </tr>
//   <tr>
//     <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
//         <div class="" style="width: 550px; text-align: center; margin: 45px 0 0 0;">
//           <p style="color: #000; font-weight: 700; font-size: 16px; margin: 5px 0;">
//             🇳🇬 Akure, Nigeria.
//           </p>
//           <p style="color: #000; font-size: 16px; margin: 5px 0;">
//             Shell Workspace,
//          </p>
//           <p style="color: #000; font-size: 16px; margin: 5px 0;">
//             Akure. Tel:
//           </p>
//         </div>
//     </td>
//   </tr>
//   <tr>
//     <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
//         <div class="" style="width: 550px; text-align: center; margin: 52px 0 0 0;">
//           <a href="https://www.linkedin.com/company/smartzeenhq/" class="sm"><img style="width: 20px; height: 20px; margin: 0 20px;" src="https://i.imgur.com/Elb2BSF.png" alt="linkedin"></a>
//           <a href="https://facebook.com/smartzeehq" class="sm"><img style="width: 20px; height: 20px; margin: 0 20px;" src="https://i.imgur.com/5ijDuLM.png" alt="facebook"></a>
//           <a href="https://www.instagram.com/smartzeehq/" class="sm"><img style="width: 20px; height: 20px; margin: 0 20px;" src="https://i.imgur.com/74YAABc.png" alt="instagram"></a>
//           <a href="https://twitter.com/smartzeeHQ" class="sm"><img style="width: 20px; height: 20px; margin: 0 20px;" src="https://i.imgur.com/xQp3Kpm.png" alt="twitter"></a>
//         </div>
//     </td>
//   </tr>
//   <tr>
//     <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
//         <div class="" style="width: 550px; text-align: center; margin: 52px 0 0 0;">
//           <img src="https://i.imgur.com/f7UML8n.png" alt="" style="display: block; width: 500px; margin: 0 auto;">
//         </div>
//         <div class="" style="width: 550px; text-align: center; margin: 15px 0 0 0;">
//           <img src="https://i.imgur.com/8PA4SaA.png" alt="" style="display: block; width: 100px; height: 100px; margin: 0 auto;">
//         </div>
//         <p style="color: #616564; font-size: 16px; margin: 15px 0;">
//           <a href="https://www.linkedin.com/in/oluwaferanmi-abodunrin-10317617a/" style="color: #08A05C;">Feranmi</a> from Tempown
//         </p>
//     </td>
//   </tr>
//   <tr>
//     <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
//         <div class="" style="width: 550px; text-align: center; margin: 52px 0 0 0;">
//           <p style="color: #616564; font-size: 16px; margin: 5px 0; text-align: center;">
//             You are receiving this message because you signed up on
//           </p>
//           <p style="color: #616564; font-size: 16px; margin: 5px 0; text-align: center;">
//             TempOwn. For more information about how we process
//           </p><p style="color: #616564; font-size: 16px; margin: 5px 0; text-align: center;">
//             data, please see our <a href="https://www.smartzee.com/policy" style="color: #10618B; text-decoration: underline;">Privacy Policy</a>
//           </p>
//           <p style="color: #616564; font-size: 16px; margin: 25px 0; text-align: center;">
//             <a href="#unsubscribe-link-goes-here" style="color: #10618B; text-decoration: underline;">Unsubscribe</a>
//           </p>
//         </div>
//     </td>
//   </tr>

//   <!-- END OF FOOTER-->
//   `;

/* eslint-disable */

export default ({ name, body, url, cta }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="index.css">
  <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
  <title>Welcome to smartzee</title>
  <style type="text/css">
    html {
      width: 100%;
    }

    body {
      background-color: #fff;
      margin: 0 auto;
      padding: 0;
    }
    .ReadMsgBody {
      width: 100%;
      background-color: #fff;
    }
    .ExternalClass {
      width: 100%;
      background-color: #fff;
    }
    a {
      color: white;
      text-decoration: none;
      font-weight: 400;
      font-style: normal;
    }
    a:hover {
      color: white;
      text-decoration: none;
      font-weight: 400;
      font-style: normal;
    }

    .cta:hover {
      background-color: #08A860 !important;
    }

    .sm {
      width: 50px;
    }

    .smLogo {
      width: 20px;
      height: 20px;
      margin: 0 20px;
    }

    table {
      border-collapse: collapse;
      max-width: 600px;
    }
</style>
</head>
<body>
  

<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#fff" style="padding: 0; margin: 0 auto;">
  <!-- START LOGO-->
  <tr>
    <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
        <div class="" style="width: 550px; text-align: left; margin: 40px 0 0 0;">
          <img class="img_scale" src="https://i.imgur.com/aStOPrS.png" width="150" height="30" alt="image" border="0" style="display: block; margin-left: -5px;" />
        </div>
    </td>
  </tr>
  <!-- END LOGO-->
  <!-- START HEADER IMAGE-->
  <tr>
    <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
        <div class="" style="width: 550px; text-align: center; margin: 20px 0 0 0;">
          <img class="img_scale" src="https://i.imgur.com/jhmfVQg.png" width="550" height="250" alt="image" border="0" style="display: block; margin: 0; background-color: #fff;" />
        </div>
    </td>
  </tr>
  <!-- END HEADER IMAGE-->

  <!-- START MESSAGE-->
  <tr>
    <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
        <div class="" style="width: 550px; text-align: left; margin: 58px 0 0 0;">
          <p style="color: #10618B; font-weight: 700; font-size: 18px; margin: 5px 0;">Welcome ${name},</p>
        </div>
    </td>
  </tr>
   <tr>
    <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
        <div class="" style="width: 550px; text-align: left; margin: 20px 0 0 0;">
          <p style="color: #616564; font-size: 16px; margin: 5px 0;">Congratulations on taking the first step towards unlocking valuable insights and making data-driven decisions!</p>
        </div>
    </td>
  </tr>
  <tr>
    <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
        <div class="" style="width: 550px; text-align: left; margin: 14px 0 0 0;">
          <p style="color: #616564; font-size: 16px; margin: 5px 0;">
            Click on the link below to verify your Email:
          </p>
          <p style="color: #616564; font-size: 16px; margin: 5px 0;">
            <a href="${url}" style="color: #10618B;">${url}</a>
          </p>
        </div>
    </td>
  </tr>
  <tr>
    <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
        <div class="" style="width: 550px; text-align: left; margin: 14px 0 0 0;">
          <p style="color: #616564; font-size: 16px; margin: 5px 0;">
            At smartzee, We provide Market Research & Business intelligence for companies looking to obtain insights and drive growth. Authentic data, from the right sources, plus analytics, equals smarter decisions.
          </p>
        </div>
    </td>
  </tr>
  <tr>
    <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
        <div class="" style="width: 550px; text-align: left; margin: 14px 0 0 0;">
          <p style="color: #10618B; font-size: 16px; font-weight: 700; margin: 5px 0;">How to get started:</p>
          <ol>
            <li>Log in to your account</li>
            <li>Create a project</li>
            <li>Make Payment</li>
            <li>Await payment approval</li>
          </ol>
        </div>
    </td>
  </tr>
  <tr>
    <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
        <div class="" style="width: 550px; text-align: left; margin: 14px 0 0 0;">
          <p style="color: #616564; font-size: 16px; margin: 5px 0;">
            Should you have any questions or need assistance,please don't hesitate to reach out to our friendly support team at [Support Email]. We are here to help.
          </p>
        </div>
    </td>
  </tr>
  <tr>
    <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
        <div class="" style="width: 550px; text-align: left; margin: 14px 0 0 0;">
          <p style="color: #616564; font-size: 16px; margin: 5px 0;">
            Team smartzee
          </p>
        </div>
    </td>
  </tr>
  <tr>
    <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
        <div class="" style="width: 550px; text-align: center; margin: 100px 0 0 0;">
          <a href="${url}"  class="cta" style="cursor: pointer; font-weight: 700; padding: 18px 206px; background-color: #08A05C; border-radius: 7px; color: #ffffff; text-decoration: none;">${cta}</a>
        </div>
    </td>
  </tr>
  <!-- END MESSAGE-->

  <!-- START OF FOOTER-->
  <tr>
    <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff"><div class="div_scale" style="width:600px;">
        <div class="" style="width: 550px; text-align: center; margin: 160px 0 0 0;">
          <img class="img_scale" src="https://i.imgur.com/pd1kVNe.png" width="450" height="100" alt="image" border="0" style="display: block; margin: 0 auto; background-color: #fff;" />
        </div>
    </td>
  </tr>
  <tr>
    <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
        <div class="" style="width: 550px; text-align: center; margin: 75px 0 0 0;">
          <p style="color: #000; font-weight: 700; font-size: 16px; margin: 5px 0;">
          </p>
          <p style="color: #000; font-size: 16px; margin: 5px 0;">
          </p>
          <p style="color: #000; font-size: 16px; margin: 5px 0;">
          </p>
        </div>
    </td>
  </tr>
  <tr>
    <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
        <div class="" style="width: 550px; text-align: center; margin: 45px 0 0 0;">
          <p style="color: #000; font-weight: 700; font-size: 16px; margin: 5px 0;">
         Akure, Nigeria.
          </p>
          <p style="color: #000; font-size: 16px; margin: 5px 0;">
            Shell Workspace, 
         </p>
          <p style="color: #000; font-size: 16px; margin: 5px 0;">
            Akure. Tel: 
          </p>
        </div>
    </td>
  </tr>
  <tr>
    <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
        <div class="" style="width: 550px; text-align: center; margin: 52px 0 0 0;">
          <a href="https://www.linkedin.com/company/smartzeenhq/" class="sm"><img style="width: 20px; height: 20px; margin: 0 20px;" src="https://i.imgur.com/Elb2BSF.png" alt="linkedin"></a>
          <a href="https://facebook.com/smartzeehq" class="sm"><img style="width: 20px; height: 20px; margin: 0 20px;" src="https://i.imgur.com/5ijDuLM.png" alt="facebook"></a>
          <a href="https://www.instagram.com/smartzeehq/" class="sm"><img style="width: 20px; height: 20px; margin: 0 20px;" src="https://i.imgur.com/74YAABc.png" alt="instagram"></a>
          <a href="https://twitter.com/smartzeeHQ" class="sm"><img style="width: 20px; height: 20px; margin: 0 20px;" src="https://i.imgur.com/xQp3Kpm.png" alt="twitter"></a>
        </div>
    </td>
  </tr>
  <tr>
    <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
        <div class="" style="width: 550px; text-align: center; margin: 52px 0 0 0;">
          <img src="https://i.imgur.com/f7UML8n.png" alt="" style="display: block; width: 500px; margin: 0 auto;">
        </div>
        <div class="" style="width: 550px; text-align: center; margin: 15px 0 0 0;">
          <img src="https://i.imgur.com/8PA4SaA.png" alt="" style="display: block; width: 100px; height: 100px; margin: 0 auto;">          
        </div>
        <p style="color: #616564; font-size: 16px; margin: 15px 0;">
          <a href="https://www.linkedin.com/" style="color: #08A05C;"></a> from smartzee
        </p>
    </td>
  </tr>
  <tr>
    <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
        <div class="" style="width: 550px; text-align: center; margin: 52px 0 0 0;">
          <p style="color: #616564; font-size: 16px; margin: 5px 0; text-align: center;">
           You are receiving this message because you signed up on TempOwn. For more information about how we process data, please see our [Privacy Policy](https://www.smartzee.com/policy).

          </p>
          <p style="color: #616564; font-size: 16px; margin: 25px 0; text-align: center;">
            <a href="#unsubscribe-link-goes-here" style="color: #10618B; text-decoration: underline;">Unsubscribe</a>
          </p>
        </div>
    </td>
  </tr>

  <!-- END OF FOOTER-->
`;
