import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { response } from 'express';
class Controller {
    constructor(){
        this.host = '192.168.1.14';
    }
    getDogs(token){
        fetch(`http://${HOST}:8000/dogs/getAll?token=${token}`, {
        method: 'get',
        headers: {
        'Accept': 'application/json, text/plain, */*', 
        'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((json) => {
        var temp = []
        for(var i=0;i<json.length;i++){
          temp.push(json[i]);
        }
       return temp
      })
      .catch((error) => {
        console.error(error);
        return temp
      });
    }
    createDog(localUri,name,breed,age,health,details,token){
        fetch(`http:/${HOST}:8000/dogs/addDog?token=${token}`, {
            method: "POST",
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type':'application/x-www-form-urlencoded'
            },
            body: `name=${name}&breed=${breed}&age=${age}&health=${health}&details=${details}`
          })
          .then((response) => response.json())
          .then((json)=> {
            if(json.message == "OK"){
              console.log(json)
              dog_id = json.id
              const options = {
                httpMethod: 'POST',
                uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                fieldName: 'file',
                }
              FileSystem.uploadAsync(`http://${HOST}:8000/image/insert?token=${token}&dog_id=${dog_id}`,localUri,options)
              .then((response)=>{
                console.log(response.body);
                return response.body
              })
              .catch((error)=> {
                return response.body
              })
            }
            else{
              return "Error";
            }
            
          })
    }
}