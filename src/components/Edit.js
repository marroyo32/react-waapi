import React, { Component } from 'react';
import styled from 'styled-components';

export default class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
          file: '',
          imagePreviewUrl: '',
          text: '',
        };
        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
      }
    
      _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        this.props.handleImageChange(this.state.imagePreviewUrl);
      }
    
      _handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
      }

      _handleTextChange(e) {
        e.preventDefault();

        this.setState({
            text: e.target.value,
        });
        this.props.handleTextChange(this.state.text);
      }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<Img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<PreviewText>Please select an Image for Preview</PreviewText>);
        }

        return(
            <EditContainer>
                <EditText>
                    <p>Text1</p>
                    <InputText
                        type="text"
                        onChange={(e)=>this._handleTextChange(e)} />
                </EditText>
                <EditImage>
                    <label>Image1</label>
                    <PreviewComponent>
                        <form onSubmit={(e)=>this._handleSubmit(e)}>
                            <FileInput 
                                type="file" 
                                onChange={(e)=>this._handleImageChange(e)} />
                            <SubmitButton
                                type="submit" 
                                onClick={(e)=>this._handleSubmit(e)}>Upload Image</SubmitButton>
                        </form>
                        <ImagePreview>
                            {$imagePreview}
                        </ImagePreview>
                    </PreviewComponent>
                </EditImage>
            </EditContainer>
        );
    }
}

const EditContainer = styled.div`
    text-align: center;
    width: 60%;
    float: right;
    margin-top: 4%;
`;

const EditText = styled.div`
    text-align: left;
`;

const EditImage = styled.div`
    text-align: left;
    margin-top: 30px;
`;

const InputText = styled.textarea`
    width: 80%;
    height: 80px;
    font-size: 25px;
`;

const ImagePreview = styled.div`
    text-align: center;
    margin: 5px 15px;
    height: 250px;
    width: 300px;
    border-left: 1px solid gray;
    border-right: 1px solid gray;
    border-top: 5px solid gray;
    border-bottom: 5px solid gray;
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
`;

const PreviewText = styled.div`
    width: 100%;
    margin-top: 20px;
`;

const FileInput = styled.input`
    border-bottom: 4px solid lightgray;
    border-right: 4px solid lightgray;
    border-top: 1px solid black;
    border-left: 1px solid black;
    padding: 10px;
    margin: 15px;
    cursor: pointer;
`;

const SubmitButton = styled.button`
    padding: 12px;
    margin-left: 10px;
    background: white;
    border: 4px solid lightgray;
    border-radius: 15px;
    font-weight: 700;
    font-size: 10pt;
    cursor: pointer;
    &:hover
        background: #efefef;
`;

const PreviewComponent = styled.div`
    
`;