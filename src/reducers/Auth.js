

const defaultUserInfo = {

  name: 'Demo',
  image: 'http://demos.creative-tim.com/light-bootstrap-dashboard-pro/assets/img/faces/face-0.jpg'
};

export default function reducer(state = {
  user: defaultUserInfo
}, action) {
  return state;
}
