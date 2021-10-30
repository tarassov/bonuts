export default class RedirectPath {
  constructor(props) {
    this.from = props.from;
    this.to = props.to;
    this.config = {
      ...props,
      redirect: true,
      active: true,
    };
  }

  getConfig = () => {
    return this.config;
  };
}
