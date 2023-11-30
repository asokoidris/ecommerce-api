/* eslint-disable */

export default ({
  name = name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' '),
  body,
  alias,
}) => `
 

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="index.css">
  <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
  <title>crown</title>
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
    <h1 style="color: #fff; font-weight: 700; font-size: 18px; text-align: center; margin: 0px; background: #000066; padding: 20px 0px;">crown</h1>
  </tr>
  <!-- END LOGO-->

  <!-- START MESSAGE-->
  <tr>
  <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
    <div class="" style="width: 550px; text-align: left; margin: 78px 0 0 0;">
      <p style="color: #10618B; font-weight: 700; font-size: 18px; margin: 5px 0;">
        ${alias || 'Hello'} ${name},
      </p>
    </div>
  </td>
</tr>
  <tr>
    <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
      <div class="" style="width: 550px; text-align: left; margin: 14px 0 0 0;">
        <p style="color: #616564; font-size: 16px; margin: 5px 0;">
          ${body}
        </p>
      </div>
    </td>
  </tr>
  <tr>
    <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
      <div class="" style="width: 550px; text-align: left; margin: 50px 0 0 0;">
        <p style="color: #616564; font-size: 16px; margin: 5px 0;">
          If you need help with anything, mail us at <a href="mailto:support@crown.com" style="color: #10618B;">support@crown.com</a>
        </p>
      </div>
    </td>
  </tr>
  <tr>
    <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
      <div class="" style="width: 550px; text-align: left; margin: 14px 0 0 0;">
        <p style="color: #616564; font-size: 16px; margin: 5px 0;">
          Cheers,
        </p>
        <p style="color: #10618B; font-size: 16px; margin: 5px 0;">
          Team crown.
        </p>
      </div>
    </td>
  </tr>
  <!-- END MESSAGE-->

  <!-- START OF FOOTER-->
  <tr>
    <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
      <div class="div_scale" style="width:600px;">
        <div style="width: 550px; text-align: center; margin: 90px 0 0 0;">
          <img class="img_scale" src="https://i.imgur.com/pd1kVNe.png" width="450" height="100" alt="image" border="0" style="display: block; margin: 0 auto; background-color: #fff;" />
        </div>
      </div>
    </td>
  </tr>
  <tr>
    <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#fff">
      <div style="width: 550px; text-align: center; margin: 75px 0 0 0;">
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
    <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif; color: #fff;" width="100%" bgcolor="#000066">
      <div style="width: 550px; text-align: center; margin: 45px 0 0 0;">
        <p style="color: #fff; font-weight: 700; font-size: 16px; margin: 5px 0;">
          Akure, Nigeria.
        </p>
        <p style="color: #fff; font-size: 16px; margin: 5px 0;">
        </p>
        <p style="color: #fff; font-size: 16px; margin: 5px 0;">
        </p>
      </div>
    </td>
  </tr>
  <tr>
    <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#000066">
    </td>
    <td width="480" style="width: 480px;  border: 1px #616564; border-width:1px 0 0 0; height:1px; width:100%; margin:0px 0px 0px 0px; padding-top:10px;padding-bottom:10px;">&nbsp;</td>
  </tr>
  <tr>
    <td class="full_width" align="center" style="font-family: ‘Open Sans’, Arial, sans-serif;" width="100%" bgcolor="#000066">
      <div style="width: 440px; border: 1px solid #D1D1D1; border-width:1px 0 0 0; text-align: center; padding: 30px 0 0 0; margin: 22px 0 0 0;">
        <p style="color: #fff; font-size: 16px; margin: 5px 0; text-align: center;">
          You are receiving this message from  crown.
        </p>
        <p style="color: #fff; font-size: 16px; margin: 5px 0; text-align: center;">
         For more information about how we process data,
        </p>
        <p style="color: #fff; font-size: 16px; margin: 5px 0; text-align: center;">
          please see our <a href="https://www.crown.com/policy" style="color: #DD6E20; text-decoration: underline;">Privacy Policy</a>
        </p>
        <p style="color: #fff; font-size: 16px; margin: 25px 0; text-align: center;">
          <a href="#unsubscribe-link-goes-here" style="color: #DD6E20; text-decoration: underline;">Unsubscribe</a>
        </p>
      </div>
    </td>
  </tr>
<!-- END OF FOOTER-->`;
