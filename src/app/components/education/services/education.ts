import { Injectable } from '@angular/core';
import { School } from '../definitions/school';
import { SCHOOLS } from '../models/schools';

@Injectable()
export class EducationService {

  static getSchools(): Promise<Array<School>> {
    return Promise.resolve(SCHOOLS);
  }

  constructor() {
  }
}
