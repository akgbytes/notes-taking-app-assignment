import app from "@/app";

const PORT = process.env.PORT;

app.listen(8080, () => {
  console.log(`Server running on port ${PORT}`);
});
