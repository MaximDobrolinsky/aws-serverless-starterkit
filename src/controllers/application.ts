class ApplicationController {
  async hello() {
    return 'Hello';
  }
}

const applicationController = new ApplicationController();

export const hello = applicationController.hello;
