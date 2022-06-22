
  async function uploadImageAsync() { 

        if (image == null) { 
          alert("you must select an image"); 
          return; 
        } 
        const { uri } = image; 
        const filename = uri.substring(uri.lastIndexOf('/') + 1); 
        const blob = await new Promise((resolve, reject) => { 
          const xhr = new XMLHttpRequest(); 
          xhr.onload = function () { 
            resolve(xhr.response); 
          }; 
          xhr.onerror = function (e) { 
            console.log(e); 
            reject(new TypeError("Network request failed")); 
          }; 
          xhr.responseType = "blob"; 
          xhr.open("GET", uri, true); 
          xhr.send(null); 
        }); 
     
        const storage = getStorage(); 
        const ex = filename.split('.'); 
        const storageRef = ref(storage, 'images/' + makeid(50) + '.' + ex[1]); 
        const uploadTask = uploadBytesResumable(storageRef, blob); 
        uploadTask.on('state_changed', 
          (snapshot) => { 
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100; 
            switch (snapshot.state) { 
              case 'paused': 
                break; 
              case 'running': 
                break; 
            } 
          }, 
          (error) => { }, 
          () => { 
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => { 
              // image url = downloadURL
              // call add To firestore
                imageFromFireStorge.push(downloadURL)

            }); 
          } 
        ); 
      }