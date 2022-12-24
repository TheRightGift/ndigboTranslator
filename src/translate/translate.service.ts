import { Injectable } from '@nestjs/common';
import { CreateTranslateDto } from './dto/create-translate.dto';
import { UpdateTranslateDto } from './dto/update-translate.dto';
const {TranslationServiceClient} = require('@google-cloud/translate');
const projectId = 'ndiigbo';
const location = 'global';

@Injectable()
export class TranslateService {
  
  async create(data: any): Promise<any> {
    let text = data.text;

    const parent = `projects/${projectId}/locations/${location}`;
    const translationClient = new TranslationServiceClient({
      credentials: {
        "type": "service_account",
        "project_id": "ndiigbo",
        "private_key_id": "d7a710d96080e52829b55ffe10bbfdf0349f4a05",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQChmPKF5K+o8z9U\nGD2TH7v3vgBZbo0jsMongo67Re8NSwx00IOLWTWmaLVFkyiGdlfHpK48DLmeZWVH\ni4WtCGxc468RQ7Og5vOHItGFtE/xv9UTvs47EF63fCZUg9MR03n3Wt3eKjQGsT6s\nx94lbnsCB37FQ6iyhb6CSBTdyzQ2XAlzk+ne+lBtp/0Z8rD0HshqqBHDFuqSxpzT\nCJXDUB3I3DGZ/NqWcgirotqZULO4gki0PyZ5swa9iVz+7/Mgogf73wN2gHm+iFU3\n9CN+FIZomHbBaPE+b7bNtQK6NngBh+Xnd/9RmzcUfFuYZlhQrAtRqdrpPipOC9WA\nuvVpxEQPAgMBAAECggEASLR1uUQQvGTkw0M8wOrwOSClK5ePrNUnvusAqMVoLoTr\nj8sYxCNY/gvyMuFoxEaOa+Zt9dqL0PYxwSTG+fjmOEzAQXZCZUxDmTNTLWLY7R2w\nEngwdWaCFu+mlzPQTR7mqyGY3RID4lbwqfAqxJCWi20v3jT4u4ltE1S2/qskTKgX\n7foeLMta3ac7Pt2YEmYfZ/Udwi9iFEa/1MdWLp3kTy19nRtTd77y8pfjGcG8qoLy\no+0ayI0eWBelX6m0A4+GE9waZ282wpBH4vhBqpNsY+s73Hc78R/GbKB/2pqUi8GY\n/RjNJq3NQFHgIGUyVwpy6DpdAoXc8mWq9/f/qACGIQKBgQDjygdHDiAoMuRIuOcO\nGU/Iy6uQwutMwvh6i05F6ew3jsQyOf5yAxeCS7ajJe3eNgYc5TrzbxKdh9/g+I1Z\nKG6EYHsspACFJDJJILQr3dOY8UeBQo2oudfmZ0fnOLFJsb4eJ9zX103pU8VUAyMr\nuP1+qgq17EHmpsGpBS2GpChJqQKBgQC1nFW2OJb+14t0SX4KYUZp45rijwP4xKrm\nrE7sbB3p5hrfhh4KgStx0corCdbgB721/DNACGwVvzQozfE3WPDog/tFEkggwwvL\nS1LjgtRJ+IJK4LYntsK1HhQ7wk1cyuqTIQVZ8UpVxiPhuhAd/LeUSgSKXrQRkqxS\nUoM1Xa7i9wKBgEEFQwyKQK2Y0Ubc2L9ShE6prGBW8zlnEexQ5VfZjN7S9rfri/DZ\nZxV/LTPmuL5MJ3SKDki8dNDYnxQlfptrihhpPd+hNLDMgzoShrtax3KJtMJ1z9/Q\npIsVAhZDPX/up3kOIeDOiWPH0LTJbHmnhVxph0MknC8NfIwVeUhMhV95AoGBAJut\nAUQMSlL1jVMHVIWtUOCf/DrNAUiTvTOy7Ix5OUMwvkRxAPtcMlOE09oEuy6bNCH1\nqDDxh0U0+48myej50rhdulxBCZcb2tZPISRpF3S5E2cALOTqIwmCWTHIouwx/NZV\n7fJlhaT1DfkGt54c7Xit4iqCd7TAl/qRRGvQfIONAoGBAJJ5i2xjBPezjXsAYz3k\nAiHojAL9eHyXospigjLOjHZU8svUFz5p6+62gIyE1qAm7CeWsGwP/yCpX5Ka31Xu\nMZv4yC0jc0TGjZdCac5tB5ooxbAc2AHD0+paJxH8dJjMqc0XVg2bhGNSVUSgC9hG\nJGSOMOheEGbAjU4H+GO9ST85\n-----END PRIVATE KEY-----\n",
        "client_email": "ndigbo@ndiigbo.iam.gserviceaccount.com",
        "client_id": "106878050747765034624",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/ndigbo%40ndiigbo.iam.gserviceaccount.com"
      }
    });

    // setup req for detecting language    
    const request = {
      parent,
      content: text
    };

    // initialize responseObject
    let resObj = {
      code: 200,
      igRender: '',
      enRender: '',
      errMsg: ''
    }
    
    // detect language
    const [response] = await translationClient.detectLanguage(request);
    let lang = '';
    
    for (const language of response.languages) {
      lang = language.languageCode;
    }
    
    const enIgRequest = {
      parent,
      contents: [text],
      mimeType: 'text/plain', // mime types: text/plain, text/html
    };
    
    // TODO: where language not detected
    if(lang == 'en' || lang == 'ig'){//if english or igbo
      if(lang === 'en'){// if english
        // translate to ig
        enIgRequest['sourceLanguageCode'] = 'en';
        enIgRequest['targetLanguageCode'] = 'ig';
        resObj.enRender = text;
      } else {// else if igbo
        // translate to english
        enIgRequest['sourceLanguageCode'] = 'ig';
        enIgRequest['targetLanguageCode'] = 'en';
        resObj.igRender = text;
      } 

      // Run request
      const [response] = await translationClient.translateText(enIgRequest);

      for (const translation of response.translations) {
        if(lang === 'en'){// if english
          resObj.igRender  = translation.translatedText;
        } else {// else if igbo
          resObj.enRender = translation.translatedText;
        }
      }

      return resObj;
    } else {//not english or igbo
      
      // translate to igbo
      enIgRequest['sourceLanguageCode'] = String(lang);
      enIgRequest['targetLanguageCode'] = 'ig';

      const [igRes] = await translationClient.translateText(enIgRequest);

      for (const igTrans of igRes.translations) {
        resObj.igRender = igTrans.translatedText;
      }
      
      // translate to english
      if(igRes){
        enIgRequest['sourceLanguageCode'] = String(lang);
        enIgRequest['targetLanguageCode'] = 'en';

        const [enRes] = await translationClient.translateText(enIgRequest);

        for (const enTrans of enRes.translations) {
          resObj.enRender = enTrans.translatedText;
        }

        return resObj;
      }
      
    }
  }

  findAll() {
    return `This action returns all translate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} translate`;
  }

  update(id: number, updateTranslateDto: UpdateTranslateDto) {
    return `This action updates a #${id} translate`;
  }

  remove(id: number) {
    return `This action removes a #${id} translate`;
  }
}
