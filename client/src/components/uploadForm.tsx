import { Form, Formik } from "formik";
import { useState } from "react"
import { uploadToWeb3Storage } from "../utils/web3Store";

export const UploadForm = () => {
    const [document, setDocument] = useState<File | null>(null);
    const [documentError, setDocumentError] = useState<string | null>(null);

    const onDocmentHandler = (event: any) => {
        setDocument(event.target.files[0])
    }

    const encryptAndUpload = async (values: any) => {
        try {
            const { authority, passPhrase } = values;
            const response = await uploadToWeb3Storage(document as File, "TESTNFT", JSON.stringify({ authority, passPhrase }));
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return <div>
        <div className="form-group">
            <label>Select Document:</label>
            <input type='file' onChange={onDocmentHandler} />
            <small className="error-text">{documentError}</small>
        </div>
        <Formik
            initialValues={{ passPhrase: "", authority: "" }}
            onSubmit={encryptAndUpload}
            validate={(values) => {
                const errors = {} as any;

                if (!document) {
                    setDocumentError('Required Document File.')
                }
                else {
                    setDocumentError('');
                }

                if (values.passPhrase === '') {
                    errors.passPhrase = 'Required Security Phrase';
                }

                if (values.authority === '') {
                    errors.authority = 'Required Authority';
                }
                return errors;
            }}
        >
            {
                ({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => <Form>
                        <div className="form-group">
                            <label>Security Phrase:</label>
                            <input
                                name="passPhrase"
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.passPhrase} />
                            <small className="error-text">{errors.passPhrase && touched.passPhrase && errors.passPhrase}</small>
                        </div>
                        <div className="form-group">
                            <label>Select Authority:</label>
                            <select
                                name="authority"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.authority}>
                                <option value=''>-- Select Authority --</option>
                                <option value="XYZ university">XYZ university</option>
                                <option value="Federal Identity Agency">Federal Identity Agency</option>
                                <option value="Police">Police</option>
                                <option value="German Embassy">German Embassy</option>
                            </select>
                            <small className="error-text">{errors.authority && touched.authority && errors.authority}</small>
                        </div>
                        <button type="submit" disabled={isSubmitting}>Submit</button>
                    </Form>
            }
        </Formik>
    </div>
}