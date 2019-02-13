import React, { Component } from "react";
import "./App.css";
import thumbsUp from "./thumbs-up-solid.svg";
import thumbsDown from "./thumbs-down-solid.svg";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    this.setState({
      data: [
        {
          name: "Stack Overflow",
          path: "https://stackoverflow.com",
          likes: 1,
          dislikes: 1,
          description: "Question Answer Website"
        },
        {
          name: "Envato",
          path: "https://envato.com",
          likes: 2,
          dislikes: 2,
          description: "Tuts Plus Community"
        },
        {
          name: "Google",
          path: "https://www.google.com",
          likes: 3,
          dislikes: 3,
          description: "Search Engine"
        },
        {
          name: "Angular Code",
          path: "https://www.angularcode.com",
          likes: 4,
          dislikes: 4,
          description: "AngularJS tutorials"
        },
        {
          name: "React",
          path: "https://reactjs.org",
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
    const win = window.open(this.state.data[index].path, "_blank");
    win.focus();
  };

  addWebsiteHandler = () => {
    alert("This function will be completed later. ");
  };

  render() {
    const { data } = this.state;
    return (
      <div className="App">
        <p className="header">Please vote for your favorite website:</p>
        <table>
          {data.map((value, index) => (
            <tr key={index}>
              <td className="thumbsIconTd">
                <img
                  className="clickable thumbsIcon"
                  onClick={() => this.upVoteHandler(index)}
                  src={thumbsUp}
                  alt="thumbsUp"
                />
              </td>
              <td className="number">{value.likes}</td>
              <td className="thumbsIconTd">
                <img
                  className="clickable thumbsIcon"
                  onClick={() => this.downVoteHandler(index)}
                  src={thumbsDown}
                  alt="thumbsDown"
                />
              </td>
              <td className="number">{value.dislikes}</td>
              <td
                className={`${index % 2 === 0 ? "empty" : "withcolor"} website`}
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
        </table>
        <button
          className="addWebsiteButton"
          onClick={() => this.addWebsiteHandler()}
        >
          Add Your Favorite Website
        </button>
      </div>
    );
  }
}

export default App;
