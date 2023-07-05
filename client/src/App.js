import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Maincontent from './Layouts/Mainlayout/Maincontent';
import Home from './Components/Main/Home';
import SingleBlog from './Components/Main/Blog/SingleBlog';
import Emailtemplatelist from './Components/Main/email-template/email-template-list';
import AuthLayout from './Layouts/Authlayout/Authlayout';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Settinglist from './Components/Main/Setting/setting-list';
import Art from './Components/Main/Category/Art';
import Science from './Components/Main/Category/Science';
import Technology from './Components/Main/Category/Technology';
import Cinema from './Components/Main/Category/Cinema';
import BlogForm from './Components/Main/Blog/Addblog';
import EmailTemplateForm from './Components/Main/email-template/email-template-save';
import SettingForm from './Components/Main/Setting/setting-save';
import Search from './Components/Main/Search';
import User from './Components/Main/User';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/account' element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path='/' element={<Maincontent />}>
          <Route path='/' element={<Home />} />
          <Route path='/blog/:id' element={<SingleBlog />} />
          <Route path='/blog/:id/edit' element={<BlogForm />} />
          <Route path='/addblog' element={<BlogForm />} />
          <Route path='/email-template' element={<Emailtemplatelist />} />
          <Route path='/email-template/add' element={<EmailTemplateForm />} />
          <Route path='/email-template/:id/edit' element={<EmailTemplateForm />} />
          <Route path='/setting' element={<Settinglist />}></Route>
          <Route path='/setting/add' element={<SettingForm />} />
          <Route path='/setting/:id/edit' element={<SettingForm />} />
          <Route path="/Art" element={<Art />} />
          <Route path="/science" element={<Science />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/cinema" element={<Cinema />} />
          <Route path="/search/:title" element={<Search />} />
          <Route path='/user' element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
