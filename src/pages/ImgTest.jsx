function ImgTest() {

    const dfsdfdsfef = (e) => {
        e.preventDefault();

        const data={}

        const formData = new FormData();
        formData.append('userfile', e.file[0])
    
        console.log(formData);
    

        // console.log(e.target.title.value);
        const file = e.target.image.files;
        const title = e.target.title.value;
        // console.log({file:file, title:title})
        
        
        console.log(formData);
    }

  return (
    <div>
        <form 
        method="post" 
        encType="multipart/form-data"
        onSubmit={(e)=>{ dfsdfdsfef(e) }}> 
            <input type="file" name="userfile" />
            <input type="text" name="title" />
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default ImgTest;
