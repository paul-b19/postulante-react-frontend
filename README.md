
<h1>Postulante API Client</h1>

<h3>Idea</h3>
There are a number of powerful API Clients such as Postman, Insomnia REST Client, soapUI, Advanced REST Client (ARC) and so on. Those applications offer flexibility and rich functional, but could be over complicated for new users or users without a deep technical knowledge. The idea of this project is to build a simple API client with intuitive user interface and that helps to bypass some operations when developing a web application rather than reinventing the wheel every time. Using a client API is a great way to speed up the development process. 

<h3>The target audience</h3>
Software developers, QA engineers, Project managers, Business analysts.

<h3>Technologies</h3>
<ul>
  <li>
    Backend
    <ul>
      <li>
        Rails
      </li>
      <li>
        PostgreSQL
      </li>
    </ul>
  </li>
  <li>
    Frontend
    <ul>
      <li>
        React.js
      </li>
      <li>
        Redux
      </li>
      <li>
        Material-UI: material-table
      </li>
      <li>
        React-Ace
      </li>
      <li>
        stringify-object, dirty-json packages
      </li>
      <li>
        Bootstrap
      </li>
      <li>
        Font Awesome
      </li>
    </ul>
  </li>
</ul>

<h3>To run the app locally</h3>
<ol>
  <li>
    Fork and clone
  </li>
  <li>
    In root directory create <b>.env</b> file and add this local variable: <b>REACT_APP_BASE_URL=http://postulante-rails-api.herokuapp.com</b> (to use backend from heroku) or <b>REACT_APP_BASE_URL=http://localhost:3000/</b> (for local backend server)
  </li>
  <li>
    In terminal from root directory run <b>npm install</b> and then <b>npm start</b>
  </li>
</ol>

