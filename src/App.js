import React, { Component } from "react";
import "./App.css";
import thumbsUp from "./thumbs-up-solid.svg";
import thumbsDown from "./thumbs-down-solid.svg";
import Modal from "react-modal";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      modal: {
        isOpen: false,
        websiteName: "",
        websiteUrl: "",
        websiteDescription: ""
      }
    };
  }

  componentDidMount() {
    this.setState({
      data: [
        {
          name: "Stack Overflow",
          url: "https://stackoverflow.com",
          likes: 1,
          dislikes: 1,
          description: "Question Answer Website"
        },
        {
          name: "Envato",
          url: "https://envato.com",
          likes: 2,
          dislikes: 2,
          description: "Tuts Plus Community"
        },
        {
          name: "Google",
          url: "https://www.google.com",
          likes: 3,
          dislikes: 3,
          description: "Search Engine"
        },
        {
          name: "Angular Code",
          url: "https://www.angularcode.com",
          likes: 4,
          dislikes: 4,
          description: "AngularJS tutorials"
        },
        {
          name: "React",
          url: "https://reactjs.org",
          likes: 5,
          dislikes: 5,
          description: "ReactJS tutorials"
        }
      ]
    });
  }

  upVoteHandler = index => {
    const { data } = this.state;
    this.setState({
      data: [
        ...data.slice(0, index),
        { ...data[index], likes: data[index].likes + 1 },
        ...data.slice(index + 1)
      ]
    });
  };

  downVoteHandler = index => {
    const { data } = this.state;
    this.setState({
      data: [
        ...data.slice(0, index),
        { ...data[index], dislikes: data[index].dislikes + 1 },
        ...data.slice(index + 1)
      ]
    });
  };

  openWebsiteHandler = index => {
    const win = window.open(this.state.data[index].url, "_blank");
    win.focus();
  };

  openModal = () => {
    this.setState({ modal: { ...this.state.modal, isOpen: true } });
  };

  // afterOpenModal = () => {
  //   this.subtitle.style.color = "#f00";
  // };

  closeModal = () => {
    this.setState({ modal: { ...this.state.modal, isOpen: false } });
  };

  setWebsiteName = e => {
    const websiteName = e.target.value;
    this.setState({
      modal: { ...this.state.modal, websiteName: websiteName }
    });
  };

  setWebsiteUrl = e => {
    const websiteUrl = e.target.value;
    this.setState({
      modal: { ...this.state.modal, websiteUrl: websiteUrl }
    });
  };

  setWebsiteDescription = e => {
    const websiteDescription = e.target.value;
    this.setState({
      modal: { ...this.state.modal, websiteDescription: websiteDescription }
    });
  };

  submitWebsite = () => {
    const { modal } = this.state;
    if (!modal.websiteName.trim()) {
      alert("Invalid websiteName. ");
    } else if (!modal.websiteUrl.trim()) {
      alert("Invalid websiteUrl. ");
    } else if (!modal.websiteDescription.trim()) {
      alert("Invalid websiteDescription. ");
    } else {
      const { data } = this.state;

      this.setState({
        data: [
          ...data,
          {
            name: modal.websiteName,
            url: modal.websiteUrl,
            likes: 0,
            dislikes: 0,
            description: modal.websiteDescription
          }
        ]
      });
    }
  };

  render() {
    const { data, modal } = this.state;
    const isOpen = modal.isOpen;
    return (
      <div className="App">
        <p className="header">Please vote for your favorite website:</p>
        <table className="mainTable">
          <tbody>
            {data.map((value, index) => (
              <tr key={index}>
                <td className="likes">
                  <img
                    className="clickable thumbsIcon"
                    onClick={() => this.upVoteHandler(index)}
                    src={thumbsUp}
                    alt="thumbsUp"
                  />
                  <span>{value.likes}</span>
                </td>
                <td className="dislikes">
                  <img
                    className="clickable thumbsIcon"
                    onClick={() => this.downVoteHandler(index)}
                    src={thumbsDown}
                    alt="thumbsDown"
                  />
                  <span>{value.dislikes}</span>
                </td>
                <td
                  className={`${
                    index % 2 === 0 ? "empty" : "withcolor"
                  } website`}
                >
                  <p
                    className="clickable websiteName websiteP"
                    onClick={() => this.openWebsiteHandler(index)}
                  >
                    {value.name}
                  </p>
                  <p className="websiteDescription websiteP">
                    {value.description}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="clickable addWebsiteButton" onClick={this.openModal}>
          Add Your Favorite Website
        </button>
        <Modal
          className="modal"
          isOpen={isOpen}
          // onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
        >
          {/* <h2 ref={subtitle => (this.subtitle = subtitle)}>Add website</h2> */}
          <h2 className="modalTitle">Add website</h2>
          <table>
            <tbody>
              <tr>
                <td>
                  <label>
                    Website Name
                    <input onChange={this.setWebsiteName} />
                  </label>
                </td>
                <td>
                  <label>
                    Website Url
                    <input onChange={this.setWebsiteUrl} />
                  </label>
                </td>
                <td>
                  <label>
                    Website Description
                    <input onChange={this.setWebsiteDescription} />
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="modalButtons">
            <button className="clickable" onClick={this.submitWebsite}>
              Submit
            </button>
            <button className="clickable" onClick={this.closeModal}>
              Close
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default App;
