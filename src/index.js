import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const style = {
  table: {
    borderCollapse: 'collapse'
  },
  tableCell: {
    border: '1px solid gray',
    margin: 0,
    padding: '5px 10px',
    width: 'max-content',
    minWidth: '150px'
  },
  form: {
    container: {
      padding: '20px',
      border: '1px solid #F0F8FF',
      borderRadius: '15px',
      width: 'max-content',
      marginBottom: '40px'
    },
    inputs: {
      marginBottom: '5px'
    },
    submitBtn: {
      marginTop: '10px',
      padding: '10px 15px',
      border:'none',
      backgroundColor: 'lightseagreen',
      fontSize: '14px',
      borderRadius: '5px'
    }
  }
}

function PhoneBookForm({ addEntryToPhoneBook }) {

  const [userDetails, setUserDetails] = useState({});

  const handleChange = (e) =>{
    console.log("calling handleChange")
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  }
  //console.log("data", userDetails)
  return (
    <form onSubmit={e => { 
                            e.preventDefault();
                            addEntryToPhoneBook(userDetails)
                          }
                    } 
          style={style.form.container}>

      <label>First name:</label>
      <br />
      <input 
        style={style.form.inputs}
        className='userFirstname'
        name='userFirstname' 
        type='text'
        onChange = {handleChange}
      />
      <br/>
      <label>Last name:</label>
      <br />
      <input 
        style={style.form.inputs}
        className='userLastname'
        name='userLastname' 
        type='text' 
        onChange = {handleChange}
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className='userPhone' 
        name='userPhone' 
        type='text'
        onChange = {handleChange}
      />
      <br/>
      <input 
        style={style.form.submitBtn} 
        className='submitButton'
        type='submit' 
        value='Add User' 
      />
    </form>
  )
}

function InformationTable(props) {
 
  const [users, setUsers] = useState([]);

  const sortByLastName = () => {
    console.log("calling sortByLastName");

    setUsers(props.users.sort((a, b) =>
      a.userLastname > b.userLastname ? 1 : b.userLastname > a.userLastname ? -1 : 0
    ));
  };

  useEffect(() => {
    sortByLastName();
    //console.log("sortedUsers", users)
  });

  return (
    <table style={style.table} className='informationTable'>
      <thead> 
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead> 
      <tbody>
        {users.map((user, i) => (
          <tr key={i}>
            <td style={style.tableCell}>{user.userFirstname}</td>
            <td style={style.tableCell}>{user.userLastname}</td>
            <td style={style.tableCell}>{user.userPhone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Application(props) {
  const [phoneBook, setPhoneBook] = useState([]);

  const handleSubmit = userObject =>{
    console.log("calling handleSubmit")
    // console.log("data", userObject)
    setPhoneBook([...phoneBook, userObject]);
  }

  return (
    <section>
      <PhoneBookForm addEntryToPhoneBook={handleSubmit} />
      <InformationTable users = {phoneBook}/>
    </section>
  );
}

ReactDOM.render(
  <Application />,
  document.getElementById('root')
);