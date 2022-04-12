import appMiddleware from '../@core/app-middleware';
import { LambdaHandlerEnum } from '../@shared/enums/app';

class ApplicationController {
  async hello() {
    return 'Hello';
  }
}

const applicationController = new ApplicationController();

export const hello = appMiddleware.wrapControllerAction(
  LambdaHandlerEnum.HELLO,
  applicationController.hello
);
