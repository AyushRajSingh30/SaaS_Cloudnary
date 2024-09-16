const formData= new FormData();
formData.append("file", "cheaker.png");
formData.append("title", "Cheaker");
formData.append("description", "click hear to login");
formData.append("originalSize", "25kb")

for (const key of formData.keys()) {
    console.log(formData.get(key));
  }