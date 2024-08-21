import React, { useState } from "react";
import "./Contact.css";
import { TextField, Checkbox, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faPhone,
  faEnvelope,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { useForm, SubmitHandler } from "react-hook-form";


interface FormValues {
  contactName: string;
  street: string;
  city: string;
  postcode: string;
  contactPhone: string;
  email: string;
  idea: string;
  nda: boolean;
}

const Contact: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    if (image) {
      console.log("Uploaded file:", image);
    }
  };

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    const maxSizeInBytes = 10 * 1024 * 1024; // 10MB

    if (file) {
      if (file.size > maxSizeInBytes) {
        setError("File size exceeds 10MB limit.");
        setImage(null);
        setFileName(null);
        setImagePreview(null);
      } else {
        setError(null);
        setImage(file);
        setFileName(file.name);

        // Create a URL for the image preview
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setImagePreview(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    } else {
      setError("No file selected.");
      setImage(null);
      setFileName(null);
      setImagePreview(null);
    }
  };

  return (
    <div className="contact-page">
      <div className="heading">
        <h1>
          Get in <span className="span-head">touch</span>
        </h1>
        <div className="subheading">
          Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo
          molestie vel, ornare non id blandit netus.
        </div>
      </div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="contact-name"
          label="Contact name"
          variant="standard"
          fullWidth
          margin="normal"
          {...register("contactName", { required: "Contact name is required" })}
          error={!!errors.contactName}
          helperText={errors.contactName?.message}
        />
        <TextField
          id="street"
          label="Street"
          variant="standard"
          fullWidth
          margin="normal"
          {...register("street", { required: "Street is required" })}
          error={!!errors.street}
          helperText={errors.street?.message}
        />
        <div className="city-postcode">
          <TextField
            id="city"
            label="City"
            variant="standard"
            fullWidth
            margin="normal"
            {...register("city", { required: "City is required" })}
            error={!!errors.city}
            helperText={errors.city?.message}
          />
          <TextField
            id="postcode"
            label="Postcode"
            variant="standard"
            fullWidth
            margin="normal"
            {...register("postcode", { required: "Postcode is required" })}
            error={!!errors.postcode}
            helperText={errors.postcode?.message}
          />
        </div>
        <TextField
          id="contact-phone"
          label="Contact Phone"
          variant="standard"
          fullWidth
          margin="normal"
          {...register("contactPhone", {
            required: "Contact phone is required",
          })}
          error={!!errors.contactPhone}
          helperText={errors.contactPhone?.message}
        />
        <TextField
          id="email"
          label="E-mail"
          variant="standard"
          fullWidth
          margin="normal"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
              message: "Invalid email address",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          id="idea"
          label="Let's talk about your idea"
          variant="standard"
          fullWidth
          margin="normal"
          {...register("idea")}
        />

        <div className="file-upload">
          <label htmlFor="file-input">
            {!fileName && (
              <>
                <FontAwesomeIcon icon={faUpload} />
                <span>Upload Additional file</span>
              </>
            )}
            {error && <div className="file-error">{error}</div>}
            {fileName && (
              <div className="file-info">Selected file: {fileName}</div>
            )}
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </label>
          <input
            type="file"
            id="file-input"
            className="file-input"
            onChange={handleImage}
            accept="image/*"
          />
          <div className="file-note">
            Attach file. File size of your documents should not exceed 10MB
          </div>
        </div>

        <div className="nda-checkbox">
          <Checkbox {...register("nda")} />
          <span>I want to protect my data by signing an NDA</span>
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="submit-button"
        >
          Submit
        </Button>
      </form>

      <div className="contact-info">
        <div className="info-item">
          <FontAwesomeIcon icon={faPhone} className="icon" />{" "}
          <span className="phone-Email-desk">
            <span>Phone:</span> <span className="detail">111 111 111</span>
          </span>
        </div>
        <div className="info-item">
          <FontAwesomeIcon icon={faEnvelope} className="icon" />{" "}
          <span className="phone-Email-desk">
            <span>E-mail:</span>
            <span className="detail"> info@company.com</span>
          </span>
        </div>
        <div className="info-item">
          <FontAwesomeIcon icon={faComments} className="icon" />{" "}
          <span className="phone-Email-desk">
            <span>Helpdesk:</span>
            <span>
              {" "}
              <a href="https://helpdesk.com" className="detail">
                https://helpdesk.com
              </a>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
