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

    const translationClient = new TranslationServiceClient();
    const request = {
      parent: `projects/${projectId}/locations/${location}`,
      contents: [text],
      mimeType: 'text/plain', // mime types: text/plain, text/html
      sourceLanguageCode: 'en',
      targetLanguageCode: 'ig',
    };

    // Run request
    const [response] = await translationClient.translateText(request);

    for (const translation of response.translations) {
        // console.log(`Translation: ${translation.translatedText}`);
        return translation.translatedText;
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
