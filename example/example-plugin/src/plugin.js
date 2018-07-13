// imports from sandbox
const fetch = imports.fetch;
// Local imports
import image from './image.png';
import Hello from './other.js';

export class ToolbarItem extends Component {
  constructor(props) {
    super(props);
    // Default Props :
    // - skripto (ability to change file's data)
    // - settings (ability to change user settings)
  }
  render() {
    return (
      <div>
        <img src={image} style={{marginLeft:8, marginTop:5, width:28, height:28,cursor:'pointer'}} />
      </div>
    )
  }
}
export class ToolbarMenu extends Component {
  constructor(props) {
    super(props);
    // Default Props :
    // - skripto (ability to change file's data)
    // - settings (ability to change user settings)
  }
  render() {
    return (
      <div>
        <input type="text"></input>
        <button>press me</button>
        <p>{Hello('user')}</p>
      </div>
    )
  }
}
