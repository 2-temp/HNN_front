function ImgTest() {

    const dfsdfdsfef = (e) => {
        e.preventDefault();
        console.log(e.target.image.files);
        // console.log(e.target.title.value);
        const file = e.target.image.files;
        const title = e.target.title.value;
        // console.log({file:file, title:title})
        

    }

  return (
    <div>
        <form 
        method="post" 
        encType="multipart/form-data"
        onSubmit={(e)=>{ dfsdfdsfef(e) }}> 
            <input type="file" name="image" />
            <input type="text" name="title" />
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default ImgTest;
