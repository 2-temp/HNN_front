function ImgTest() {

    const dfsdfdsfef = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('userfile', e.file[0])
    
        const file = e.target.image.files;
        const title = e.target.title.value;
        
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
