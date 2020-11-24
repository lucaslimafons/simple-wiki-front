export default class BaseService {
   getErrors(error) {
      let errors = [];
      let status = "";

      if (error && error.response) {
         if (error.response.status != 200) {
            let data = error.response.data;

            if (data.error != undefined && data.error.length > 0) {
               data.error.forEach(function (item) {
                  errors.push({
                     field: item.field,
                     message: item.message
                  });
               });
            } else if (data.success == 'false' || !data.success) {
               errors.push({
                  field: '',
                  message: data.message
               });
            }

            status = error.response.status;
         }
      }

      return { status: status, errors: errors };
   }
}
