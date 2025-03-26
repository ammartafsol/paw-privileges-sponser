"use client";

import BorderWrapper from "@/component/atoms/BorderWrapper";
import Button from "@/component/atoms/Button";
import Input from "@/component/atoms/Input/Input";
import ContentHeader from "@/component/molecules/ContentHeader";
import UploadImageBox from "@/component/molecules/UploadImageBox";
import { mergeClass } from "@/resources/utils/helper";
import classes from "./Account.module.css";
import { useState } from "react";
import MultiFileUpload from "@/component/molecules/MultiFileUpload/MultiFileUpload";
import { TextArea } from "@/component/atoms/TextArea/TextArea";
import { SlCloudUpload } from "react-icons/sl";
import { getSupportedImageTypes } from "@/resources/utils/mediaUpload";
import { signUpSchema } from "@/formik/schema/SignUpSchema";
import { useFormik } from "formik";
import SocialMediaSelect from "@/component/molecules/SocialMediaSelect";
import { FiPlus } from "react-icons/fi";
import DateInput from "@/component/molecules/DateInput";

const AccountTemplate = () => {
  const [documentFiles, setDocumentFiles] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [formData, setFormData] = useState({
    image: null,
  });
  // handleUpdate
  const handleUpdate = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const accountFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      location: "",
      contact: "",
      password: "",
      date: "",
      description: "",
      // logo: null,
      gallery: [],
      socialLinks: [],
    },
    validationSchema: signUpSchema,

    onSubmit: (values) => {
      console.log("Formik Errors:", accountFormik.errors); // Check if validation is blocking submission
      console.log("Form Submitted", values);
    },
  });

  const handleAdd = () => {
    console.log("Input Value:", inputValue);
    console.log("Current Social Links:", accountFormik.values.socialLinks);

    if (
      inputValue.trim() &&
      !accountFormik.values.socialLinks.includes(inputValue)
    ) {
      const updatedLinks = [
        ...accountFormik.values.socialLinks,
        inputValue.trim(),
      ];
      console.log("Updated Social Links:", updatedLinks);

      accountFormik.setFieldValue("socialLinks", updatedLinks);
      setInputValue(""); // Clear input
    }
  };

  const handleRemove = (platform) => {
    const updatedLinks = accountFormik.values.socialLinks.filter(
      (item) => item !== platform
    );
    accountFormik.setFieldValue("socialLinks", updatedLinks);
  };

  return (
    <>
      <BorderWrapper>
        <div className={classes.head}>
          <ContentHeader title={"Account Setting"} />
        </div>
        <UploadImageBox
          containerClass={classes.uploadImageContainerClass}
          hideDeleteIcon={true}
          state={formData?.image}
          uploadImageBox={classes.uploadImageBox}
          setter={(file) => {
            handleUpdate("image", file);
          }}
          onDelete={() => {
            handleUpdate("image", null);
          }}
          onEdit={() => {}}
          imgClass={classes.uploadImage}
          label="Upload Gallery"
          text={"Please upload an image with dimensions of 120x170"}
        />
        <div className={classes.inputField}>
          <div className="flexColGap">
            <Input
              name="name"
              placeholder="Wade Warren"
              label="Name"
              value={accountFormik.values.name}
              setValue={accountFormik.handleChange("name")}
              errorText={
                accountFormik.touched.name && accountFormik.errors.name
              }
            />
            <Input
              name="email"
              placeholder="Email"
              type="email"
              label="Email"
              value={accountFormik.values.email}
              setValue={accountFormik.handleChange("email")}
              errorText={
                accountFormik.touched.email && accountFormik.errors.email
              }
            />
            <Input
              name="location"
              placeholder="Monaco"
              label="Location"
              value={accountFormik.values.location}
              setValue={accountFormik.handleChange("location")}
              errorText={
                accountFormik.touched.location && accountFormik.errors.location
              }
            />
            <Input
              name="contact"
              placeholder="(308) 555-0121"
              label="Contact"
              value={accountFormik.values.contact}
              setValue={accountFormik.handleChange("contact")}
              errorText={
                accountFormik.touched.contact && accountFormik.errors.contact
              }
            />
            <Input
              name="password"
              placeholder="password"
              type="password"
              label="Password"
              value={accountFormik.values.password}
              setValue={accountFormik.handleChange("password")}
              errorText={
                accountFormik.touched.password && accountFormik.errors.password
              }
            />
            <DateInput
              label={"Date"}
              name="date"
              placeholder="10-10-25"
              type="date"
              value={accountFormik.values.date}
              setValue={accountFormik.handleChange("date")}
              errorText={
                accountFormik.touched.date && accountFormik.errors.date
              }
            />
            {/* <Input
              name="date"
              placeholder="10-10-25"
              type="date"
              label="Date"
              value={accountFormik.values.date}
              setValue={accountFormik.handleChange("date")}
              errorText={
                accountFormik.touched.date && accountFormik.errors.date
              }
            /> */}
            <TextArea
              name="description"
              placeholder="Type Description"
              label="Description"
              value={accountFormik.values.description}
              setter={accountFormik.handleChange("description")}
              errorText={
                accountFormik.touched.description &&
                accountFormik.errors.description
              }
            />
            <MultiFileUpload
              extraStyles={{ marginBottom: "10px" }}
              label="Upload Gallery"
              text="Please upload an image with dimensions of 120x170"
              uploadText="Browse and choose the files you want to upload from your computer"
              supportedFiles="(Image Dimensions 1200x170)"
              uploadIcon={
                <SlCloudUpload size={24} color="var(--Mine-Shaft-500)" />
              }
              setFiles={(files) => {
                setDocumentFiles(files);
                accountFormik.setFieldValue("gallery", files);
              }}
              acceptedFiles={getSupportedImageTypes("images")}
              files={documentFiles}
              removeFileCb={(key) => {
                const newDocuments = documentFiles.filter((e) => e !== key);
                setDocumentFiles(newDocuments);
                accountFormik.setFieldValue("gallery", newDocuments);
              }}
              maxFileCount={5}
              errorText={
                accountFormik.touched.gallery && accountFormik.errors.gallery
              }
            />

            <SocialMediaSelect
              inputLabel="Share Social Link*"
              inputPlaceholder="Enter social media name"
              RightBtn={true}
              btnLabel="Add Link"
              btnLeftIcon={<FiPlus />}
              inputValue={inputValue}
              setInputValue={setInputValue}
              socialLinks={accountFormik.values.socialLinks}
              handleAdd={handleAdd}
              handleRemove={handleRemove}
              errorText={
                accountFormik.touched.socialLinks &&
                accountFormik.errors.socialLinks
              }
            />
          </div>

          <div className={mergeClass("mt16 ", classes.profileBtns)}>
            <Button
              className="fitContent"
              label={"Cancel"}
              variant={"outline"}
            />
            <Button
              className="fitContent"
              variant={"primary"}
              label={"Update Profile"}
              onClick={accountFormik.handleSubmit}
            />
          </div>
        </div>
      </BorderWrapper>
    </>
  );
};

export default AccountTemplate;
