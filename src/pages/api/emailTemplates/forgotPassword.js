const forgotPassword = (email, otp) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>Aquakart Password Reset</title>
          <!-- Removed script tag for Font Awesome -->
          <!-- Removed link tag for Bootstrap CSS -->
          <style>
            /* Inline styles for the email body and containers */
            body {
              font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
              margin: 0;
              padding: 0;
              -webkit-text-size-adjust: none;
              -ms-text-size-adjust: none;
            }
            .email-container {
              width: 100%;
              margin: auto;
              padding: 20px;
              background: #ffffff;
              box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
            }
            .header-img {
              height: 80px; /* Adjust as needed */
              margin-bottom: 20px;
            }
            .otp {
              font-size: 22px; /* Adjust as needed */
              margin: 20px 0;
              padding: 10px;
              border: 1px solid #dddddd;
              display: inline-block;
            }
            /* Inline styles for other elements as needed */
          </style>
        </head>
        <body>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
            <tr>
              <td align="center">
                <table class="email-container" role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                  <!-- Email content -->
                  <tr>
                    <td align="center">
                      <img src="https://res.cloudinary.com/aquakartproducts/image/upload/v1695408027/android-chrome-384x384_ijvo24.png" alt="Aquakart" class="header-img"/>
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <h1>Hello, AquaKart User!</h1>
                      <p>A request has been received to change the password for your AquaKart account associated with <strong>${email}</strong>.</p>
                      <p>Your OTP for password reset is:</p>
                      <div class="otp">${otp}</div>
                      <p>If you did not request this, please ignore this email. This OTP will expire in 1 hour.</p>
                      <!-- Social icons -->
                      <a href="https://www.instagram.com/aquakart.co.in/">
                        <img src="https://static-00.iconduck.com/assets.00/instagram-icon-2048x2048-uc6feurl.png" width="30" height="30" alt="Instagram" style="margin-right: 10px;"/>
                      </a>
                      <a href="https://www.x.com/aquakart">
                        <img src="https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?size=338&ext=jpg" width="30" height="30" alt="Twitter"/>
                      </a>
                      <hr>
                      <p>If you have any issues or questions, please contact our support team.</p>
                    </td>
                  </tr>
                  <!-- Add additional content here -->
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;
  };
  
  export default forgotPassword;
  