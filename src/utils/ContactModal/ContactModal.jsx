"use client";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import classNames from "classnames";

import "./ContactModal.scss";
import { LocaleContext } from "@/lib/providers/LocaleContext/context";
import { useLanguageContent } from "@/lib/helpers/useLanguageContent";
import fullData from "./ContactContent.json";
import Image from "next/image";
import { motion } from "framer-motion";
import { anim, animModal } from "@/lib/helpers/anim";
import { sendContactMessage } from "@/lib/helpers/contact";

export default function ContactModal({ isActive, setIsActive }) {
  const [contactType, setContactType] = useState("telegram");
  const [submitted, setSubmitted] = useState(false);
  const { lang } = useContext(LocaleContext);
  const data = useLanguageContent(fullData, lang);

  const getValidationSchema = (contactType) => {
    const baseSchema = {
      name: Yup.string().required(data?.form.nameInput.error),
    };

    const contactTypeSchema = {
      telegram: Yup.string().required(data?.form.telegramInput.error),
      whatsapp: Yup.string().required(data?.form.whatsappInput.error),
      skype: Yup.string().required(data?.form.skypeInput.error),
      email: Yup.string()
        .email(data?.form.emailInput.error)
        .required(data?.form.emailInput.error),
    };

    return Yup.object().shape({
      ...baseSchema,
      [contactType]: contactTypeSchema[contactType],
    });
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log({ ...values, contactType });
    setSubmitting(false);
    setSubmitted(true);
    resetForm();

    try {
      await sendContactMessage({ ...values, contactType });
    } catch (error) {
      console.error('Error sending message.', error);
    }
  };

  return (
    <>
      <motion.div className="contact-background" {...anim(animModal.wrapperPresence)} />
      <motion.div className="contact" {...anim(animModal.wrapperPresence)}>
        <h1 className="fz--30 fz--mobile-25">{data.title}</h1>
        <div
          className="contact__back-button"
          onClick={() => setIsActive({ isActive: false, type: "" })}  
        >
          <svg
            className="contact__back-button-icon"
            viewBox="0 0 26 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292893 7.29289ZM26 7L1 7V9L26 9V7Z" />
          </svg>
          BACK
        </div>

        <Formik
          initialValues={{
            name: "",
            email: "",
            telegram: "",
            skype: "",
            whatsapp: "",
          }}
          validationSchema={getValidationSchema(contactType)}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isValid, dirty }) => (
            <Form className="form">
              <div className="form__input-wrapper">
                <Field
                  name="name"
                  className={classNames("form__input", {
                    "form__input--error": errors.name && touched.name,
                  })}
                  placeholder={data?.form.nameInput.placeholder}
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="form__input-error-msg"
                />
              </div>

              <div className="form-change-type__wrapper">
                <div
                  className={classNames("form-change-type", {
                    "form-change-type--active": contactType === "telegram",
                  })}
                  onClick={() => setContactType("telegram")}
                >
                  <svg
                    className="icon"
                    viewBox="0 0 122 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1122_295)">
                      <path
                        className="icon__path--fill"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M92.116 59.688C92.116 76.6365 78.2109 90.3759 61.058 90.3759C43.9051 90.3759 30 76.6365 30 59.688C30 42.7395 43.9051 29 61.058 29C78.2109 29 92.116 42.7395 92.116 59.688ZM62.171 51.6552C59.1501 52.8967 53.1127 55.4663 44.0586 59.364C42.5884 59.9417 41.8182 60.5069 41.7481 61.0595C41.6296 61.9934 42.8133 62.3611 44.4251 62.8619C44.6443 62.9301 44.8715 63.0006 45.1044 63.0754C46.6902 63.5848 48.8233 64.1806 49.9322 64.2043C50.9381 64.2258 52.0608 63.816 53.3003 62.975C61.7598 57.3327 66.1266 54.4808 66.4008 54.4193C66.5942 54.3759 66.8622 54.3214 67.0438 54.4809C67.2254 54.6403 67.2076 54.9424 67.1883 55.0234C67.0711 55.5173 62.4249 59.7854 60.0205 61.9941C59.2709 62.6827 58.7392 63.1711 58.6305 63.2826C58.387 63.5325 58.1389 63.7689 57.9004 63.9961C56.4272 65.3993 55.3224 66.4517 57.9616 68.1701C59.2298 68.9959 60.2447 69.6788 61.2572 70.3601C62.3629 71.1041 63.4658 71.8462 64.8927 72.7704C65.2562 73.0059 65.6034 73.2505 65.9416 73.4887C67.2284 74.3951 68.3845 75.2095 69.8127 75.0796C70.6426 75.0041 71.4999 74.2331 71.9352 71.9334C72.9641 66.4985 74.9866 54.7228 75.454 49.8703C75.4949 49.4452 75.4434 48.9011 75.402 48.6622C75.3607 48.4234 75.2742 48.0831 74.96 47.8312C74.5879 47.5328 74.0134 47.4699 73.7565 47.4744C72.5884 47.4947 70.7961 48.1105 62.171 51.6552Z"
                      />
                    </g>
                    <g style={{ mixBlendMode: "hard-light" }}>
                      <path
                        d="M120.447 60C120.447 92.5735 93.7192 119 60.7235 119C27.7278 119 1 92.5735 1 60C1 27.4265 27.7278 1 60.7235 1C93.7192 1 120.447 27.4265 120.447 60Z"
                        className="icon__path--stroke"
                        strokeWidth="2"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1122_295">
                        <rect
                          width="62.116"
                          height="61.3759"
                          fill="white"
                          transform="translate(30 29)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div
                  className={classNames("form-change-type", {
                    "form-change-type--active": contactType === "whatsapp",
                  })}
                  onClick={() => setContactType("whatsapp")}
                >
                  <svg
                    className="icon"
                    viewBox="0 0 122 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M120.447 60C120.447 92.5735 93.7192 119 60.7235 119C27.7278 119 1 92.5735 1 60C1 27.4265 27.7278 1 60.7235 1C93.7192 1 120.447 27.4265 120.447 60Z"
                      className="icon__path--stroke"
                      strokeWidth="2"
                    />
                    <path
                      d="M29 90.3759L33.3662 74.6151C30.672 70.0017 29.2562 64.7719 29.2588 59.4092C29.2666 42.6434 43.0744 29 60.0398 29C68.2728 29.0026 76.001 32.1711 81.814 37.92C87.6245 43.6689 90.8234 51.3102 90.8208 59.4374C90.8131 76.2058 77.0052 89.8491 60.0398 89.8491C54.8894 89.8466 49.814 88.5705 45.3184 86.1461L29 90.3759ZM46.0741 80.6402C50.4119 83.1847 54.5529 84.7089 60.0295 84.7115C74.1298 84.7115 85.616 73.3723 85.6238 59.4322C85.629 45.4641 74.1971 34.1402 60.0502 34.1351C45.9395 34.1351 34.461 45.4743 34.4558 59.4118C34.4533 65.1018 36.1407 69.3624 38.9748 73.8198L36.3892 83.1489L46.0741 80.6402ZM75.5455 66.6669C75.354 66.3498 74.8415 66.1606 74.0703 65.7795C73.3016 65.3985 69.5203 63.5598 68.8137 63.3066C68.1097 63.0534 67.5973 62.9256 67.0822 63.6876C66.5698 64.4472 65.0945 66.1606 64.6468 66.6669C64.199 67.1733 63.7487 67.2372 62.98 66.8562C62.2113 66.4751 59.7318 65.6747 56.7943 63.0841C54.5089 61.0689 52.9638 58.5806 52.516 57.8186C52.0683 57.059 52.4694 56.6473 52.8525 56.2688C53.1993 55.9287 53.6212 55.3814 54.0068 54.9365C54.3976 54.4966 54.5245 54.1795 54.7833 53.6706C55.0395 53.1642 54.9127 52.7192 54.7186 52.3382C54.5245 51.9597 52.9871 48.2183 52.3478 46.6967C51.7215 45.216 51.0874 45.4155 50.6163 45.3925L49.1411 45.3669C48.6286 45.3669 47.7952 45.5562 47.0912 46.3182C46.3873 47.0803 44.3996 48.9165 44.3996 52.6579C44.3996 56.3992 47.156 60.0128 47.539 60.5191C47.9246 61.0255 52.9612 68.7026 60.6765 71.9939C62.5115 72.7764 63.9454 73.2444 65.0609 73.5947C66.9036 74.1727 68.5808 74.0909 69.9059 73.8965C71.3837 73.6791 74.4559 72.0578 75.0978 70.283C75.7396 68.5056 75.7396 66.984 75.5455 66.6669Z"
                      className="icon__path--fill"
                    />
                  </svg>
                </div>
                <div
                  className={classNames("form-change-type", {
                    "form-change-type--active": contactType === "skype",
                  })}
                  onClick={() => setContactType("skype")}
                >
                  <svg
                    className="icon"
                    viewBox="0 0 122 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M120.478 60C120.478 92.5735 93.7504 119 60.7547 119C27.759 119 1.03125 92.5735 1.03125 60C1.03125 27.4265 27.759 1 60.7547 1C93.7504 1 120.478 27.4265 120.478 60Z"
                      className="icon__path--stroke"
                      strokeWidth="2"
                    />
                    <path
                      d="M85.517 65.9238C85.6809 64.6279 85.8449 63.494 85.8449 62.1981C85.8449 49.2389 75.1886 38.5476 61.9093 38.5476C60.5977 38.5476 59.4501 38.7096 58.1386 38.8716C56.0073 37.7377 53.7121 37.2517 51.4169 37.2517C43.2198 37.2517 36.6621 43.7313 36.6621 51.8307C36.6621 54.0986 37.1539 56.3664 38.3015 58.4723C38.1376 59.7682 37.9736 60.9021 37.9736 62.1981C37.9736 75.1572 48.6299 85.8485 61.9093 85.8485C63.2208 85.8485 64.3684 85.6865 65.6799 85.5245C67.8112 86.4965 70.1064 87.1444 72.4016 87.1444C80.5987 87.1444 87.1564 80.6648 87.1564 72.5654C87.1564 70.2975 86.5007 68.0297 85.517 65.9238ZM71.9098 70.7835C71.4179 71.7554 70.7622 72.5654 69.7785 73.2133C68.7949 73.8613 67.8112 74.3473 66.4997 74.6712C65.1881 74.9952 63.7126 75.1572 62.0732 75.1572C58.6304 75.1572 55.8434 74.3473 53.8761 72.8894C52.7285 71.9174 51.7448 70.7835 51.253 69.3256C50.5972 68.0297 51.7448 66.4098 53.3843 66.4098H53.8761C54.8597 66.4098 55.8434 67.0577 56.1713 67.8677C56.4992 68.6776 56.991 69.3256 57.6468 69.8116C58.6304 70.6215 60.1059 70.9455 61.9093 70.9455C63.5487 70.9455 64.8602 70.6215 65.8439 70.1355C66.8275 69.6496 67.3194 68.6776 67.3194 67.7057C67.3194 67.2197 67.1554 66.8958 66.9915 66.5718C66.8275 66.2478 66.3357 65.9238 66.0078 65.7618C65.516 65.4379 65.0242 65.2759 64.2045 65.1139C63.5487 64.9519 62.729 64.6279 61.7453 64.4659L60.7617 64.1419C59.6141 63.818 58.3025 63.494 57.3189 63.17C56.1713 62.846 55.1876 62.3601 54.3679 61.8741C53.5482 61.3881 52.8924 60.7402 52.4006 59.7682C51.9088 58.9583 51.7448 57.8244 51.7448 56.5284C51.7448 55.2325 52.0727 54.0986 52.5645 53.1267C53.0564 52.1547 53.8761 51.3448 54.6958 50.8588C55.6794 50.2109 56.6631 49.7249 57.9746 49.5629C59.1222 49.2389 60.4338 49.0769 61.9093 49.0769C63.5487 49.0769 64.8602 49.2389 66.1718 49.5629C67.4833 49.8869 68.467 50.3728 69.4506 51.1828C70.4343 51.8307 71.09 52.6407 71.5819 53.7746C72.4016 55.2325 71.254 57.1764 69.4506 57.1764H68.9588C67.9751 57.1764 67.1554 56.6904 66.6636 55.8805C66.3357 55.3945 66.0078 54.9085 65.516 54.4226C64.6963 53.7746 63.3847 53.4506 61.9093 53.4506C60.4338 53.4506 59.2862 53.7746 58.4665 54.2606C57.6468 54.7466 57.3189 55.5565 57.3189 56.3664C57.3189 56.8524 57.4828 57.1764 57.6468 57.5004C57.8107 57.8244 58.1386 58.1483 58.6304 58.3103C59.1222 58.4723 59.6141 58.7963 60.2698 58.9583C60.9256 59.1203 61.7453 59.2823 62.729 59.6062C63.7126 59.7682 64.5323 60.0922 65.516 60.2542C66.3357 60.4162 67.1554 60.7402 67.9751 60.9022C68.7949 61.2261 69.4506 61.5501 70.1064 61.8741C70.7622 62.1981 71.254 62.684 71.7458 63.17C72.2376 63.656 72.5655 64.3039 72.7295 64.9519C73.0574 65.5998 73.0574 66.5718 73.0574 67.5437C72.7295 68.6776 72.4016 69.8116 71.9098 70.7835Z"
                      className="icon__path--fill"
                    />
                  </svg>
                </div>
                <div
                  className={classNames("form-change-type", {
                    "form-change-type--active": contactType === "email",
                  })}
                  onClick={() => setContactType("email")}
                >
                  <svg
                    viewBox="0 0 122 120"
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M120.447 60C120.447 92.5735 93.7192 119 60.7235 119C27.7278 119 1 92.5735 1 60C1 27.4265 27.7278 1 60.7235 1C93.7192 1 120.447 27.4265 120.447 60Z"
                      className="icon__path--stroke"
                      strokeWidth="2"
                    />
                    <path
                      d="M75.2588 45.0811L72.4855 47.2478L60.6771 56.0228L48.8688 47.1611L46.0955 44.9944C45.4421 44.4539 44.6446 44.117 43.8016 44.0254C42.9586 43.9337 42.1073 44.0914 41.3531 44.4789C40.5989 44.8664 39.9749 45.4667 39.5585 46.2053C39.1421 46.944 38.9516 47.7885 39.0105 48.6344V73.7461C39.0105 74.5276 39.3209 75.2771 39.8735 75.8297C40.4261 76.3823 41.1756 76.6928 41.9571 76.6928H48.8688V59.9661L60.6771 68.8278L72.4855 59.9661V76.6928H79.3971C80.1786 76.6928 80.9281 76.3823 81.4807 75.8297C82.0334 75.2771 82.3438 74.5276 82.3438 73.7461V48.6344C82.3845 47.7958 82.1807 46.9635 81.7572 46.2386C81.3337 45.5136 80.7087 44.9274 79.9582 44.551C79.2078 44.1746 78.3641 44.0243 77.5298 44.1184C76.6955 44.2125 75.9066 44.547 75.2588 45.0811Z"
                      className="icon__path--fill"
                    />
                  </svg>
                </div>
              </div>

              {contactType === "email" && (
                <div className="form__input-wrapper">
                  <Field
                    name="email"
                    className={classNames("form__input", {
                      "form__input--error": errors.email && touched.email,
                    })}
                    placeholder={data?.form.emailInput.placeholder}
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="form__input-error-msg"
                  />
                </div>
              )}

              {contactType === "telegram" && (
                <div className="form__input-wrapper">
                  <Field
                    name="telegram"
                    className={classNames("form__input", {
                      "form__input--error": errors.telegram && touched.telegram,
                    })}
                    placeholder={data?.form.telegramInput.placeholder}
                  />
                  <ErrorMessage
                    name="telegram"
                    component="p"
                    className="form__input-error-msg"
                  />
                </div>
              )}

              {contactType === "skype" && (
                <div className="form__input-wrapper">
                  <Field
                    name="skype"
                    className={classNames("form__input", {
                      "form__input--error": errors.skype && touched.skype,
                    })}
                    placeholder={data?.form.skypeInput.placeholder}
                  />
                  <ErrorMessage
                    name="skype"
                    component="p"
                    className="form__input-error-msg"
                  />
                </div>
              )}

              {contactType === "whatsapp" && (
                <div className="form__input-wrapper">
                  <Field
                    name="whatsapp"
                    className={classNames("form__input", {
                      "form__input--error": errors.whatsapp && touched.whatsapp,
                    })}
                    placeholder={data?.form.whatsappInput.placeholder}
                  />
                  <ErrorMessage
                    name="whatsapp"
                    component="p"
                    className="form__input-error-msg"
                  />
                </div>
              )}

              <button
                type="submit"
                className={classNames("submit-button button", {
                  "submit-button--disabled": !isValid || !dirty,
                })}
                disabled={!isValid || !dirty}
              >
                <div className="button__text">
                  <div className="text-wrapper">
                    <div className="flip">
                      <p data-cursor-active> {data.form.submitButton}</p>
                      <p data-cursor-active> {data.form.submitButton}</p>
                    </div>
                  </div>
                </div>
                <div className="arrow__wrapper">
                  <div className="arrow">
                    <Image
                      src="/images/arrow.svg"
                      className="arrow__icon"
                      width={45}
                      height={38}
                      alt=""
                    />
                    <Image
                      src="/images/arrow.svg"
                      className="arrow__icon"
                      width={45}
                      height={38}
                      alt=""
                    />
                  </div>
                </div>
              </button>
            </Form>
          )}
        </Formik>
      </motion.div>
    </>
  );
}
