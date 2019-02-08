import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProfileApiService {
Id;
  constructor(public http: HttpClient) { }
postApiAbout(code, form) {
  return this.http.post(`http://localhost:4000/profileConsultant/postProfile/${code}`, form);
}
uploadFile(code, file) {
  const headers = new HttpHeaders();
    headers.set('Content-Type', 'form-data');
    return this.http.post(`http://localhost:4000/profileConsultant/upload/${code}`, file, {headers} );
}
getprofileApi(code) {
  return this.http.get(`http://localhost:4000/profileConsultant/getProfile/${code}`);
}
postexpApi(code, form) {
  return this.http.post(`http://localhost:4000/profileConsultant/exp/${code}`, form);
}
updateApiExp(code, index, form) {
  return this.http.put(`http://localhost:4000/profileConsultant/exp/update/${code}/${index}`, form);

}
setDispo(code, form) {
  return this.http.post(`http://localhost:4000/profileConsultant/dispo/${code}`, form);
}
setCategorie(code, form) {
  return this.http.post(`http://localhost:4000/profileConsultant/Categorie/${code}`, form);
}
setSkills(code, form) {
  return this.http.post(`http://localhost:4000/profileConsultant/skills/${code}`, form);
}
setSalary(code, form) {
  return this.http.post(`http://localhost:4000/profileConsultant/salary/${code}`, form);
}
getUser(id) {
  return this.http.get(`http://localhost:4000/profileConsultant/user/${id}`);
}
setId(f) {
  this.Id = f;
}
getId() {
  return this.Id;
}
}
