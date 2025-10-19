const { Resend } = require('resend');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Habka Lama Oggola' };
  }

  const resend = new Resend('re_ZJwdd1bu_JkAHemQp2GxW47ufPDHimCVy'); // <<< WAA KAN FURAHAGAAGII LA GELIYAY
  
  try {
    const userData = JSON.parse(event.body);

    // Hubi in email jiro ka hor inta aan la dirin
    if (!userData.email) {
      return { statusCode: 400, body: JSON.stringify({ message: "Emailka macmiilka lama hayo."}) };
    }

    await resend.emails.send({
      from: 'xaqiijin@ebalami.com', // KAN WAA EMAIL AAD SOO SAARTAY, TUSAALE
      to: userData.email, // Waxaan u diraynaa emailkii macmiilka
      subject: `Xaqiijinta Dalabkaaga e-Balami`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Hambalyo, ${userData.name}!</h2>
          <p>Waxaan si guul leh u helnay dalabkaaga socdaalka caafimaad ee e-Balami. Kooxdeennu waxay hadda diyaarinayaan qorshahaaga.</p>
          <hr>
          <h3>Faahfaahinta Dalabkaaga:</h3>
          <ul>
            <li><strong>Magaalada Aad u Socotid:</strong> ${userData.destination}</li>
            <li><strong>Adeegyada aad dooratay:</strong> ${userData.services ? userData.services.join(', ') : 'Lama dooran'}</li>
          </ul>
          <hr>
          <p>Shaqaalaheennu waxay kula soo xiriiri doonaan saacadaha soo socda si ay kuu siiyaan macluumaad dheeri ah.</p>
          <p>Mahadsanid inaad dooratay e-Balami!</p>
          <p><em>Qaybta Adeegga Macaamiisha, e-Balami</em></p>
        </div>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Emailka si guul leh ayaa loo diray" }),
    };

  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Way suurtogeli weyday in la diro iimaylka." }),
    };
  }
};