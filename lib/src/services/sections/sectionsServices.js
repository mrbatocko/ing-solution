import SectionModel from '../../models/section/sectionModel';
import promisifyObjectMethods from '../../utils/promisifyObjectMethods';

const services = {
  getSections: async cb => {
    try {
      const sections = await SectionModel.find();
      cb(null, sections);
    } catch (error) {
      cb(error);
    }
  },
}

export default promisifyObjectMethods(services);