'use client';
import { Container, Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

export default function Register() {
 
  const [formUser, setFormUser] = useState({
    username: '',
    password: '',
    role: '',
  });
  const [Pesan, setPesan] = useState('');
  const [Tampil, setTampil] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    //masukan data ke serve
    const registerAPI = await fetch('/api/users', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(formUser),
    });
    const result = await registerAPI.json();
    console.log(registerAPI.json);
    setPesan(result.message);
    setTampil(result.message);

  };
  return (
    <>
      <div className="h-100 container-fluid">
        <div className="justify-content-center align-items-center h-100 row">
          <div className="loginContainer col-lg-12">
            <div className="p-4 d-flex justify-content-center gap-2" >
              <div className="card">
                <div className="p-4 m-1 card-body " style={{ width: '350px' }}>
                  <h5 className="mb-3 d-flex justify-content-center">Register</h5>
                  {Tampil &&
                  <div style={{ width: '300px' }}>
                      <Alert className="mb-0" variant="primary" > 
                      {Pesan}
                      </Alert>                  
                  </div>
}
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="text" value={formUser.username} onChange={(e) => setFormUser({ ...formUser, username: e.target.value })} placeholder="Username" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control type="password" value={formUser.password} onChange={(e) => setFormUser({ ...formUser, password: e.target.value })} placeholder="Password" />
                    </Form.Group>
                    <Form.Select className="mb-3" aria-label="Default select example" onChange={(e) => setFormUser({ ...formUser, role: e.target.value })}>
                      <option>Pilih</option>
                      <option value="admin">Admin</option>
                      <option value="petugas">Petugas</option>
                    </Form.Select>
                    <small class="pb-4 d-block">
                      Already have an account?
                      <a href="/login">Login</a>
                    </small>
                    <Button variant="primary" type="submit" onClick={handleRegister}>
                      Register
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}