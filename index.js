import React, { Component } from 'react';
import {
    Image,
    View,
    Platform
} from 'react-native';

class PlaceholderImage extends Component {

    constructor(props) {
        super(props);
        let status = -1;  // 0 使用本地图片; 1 使用占位图; 2 使用远程图片; 3 使用远程占位图; -1 不显示;
        // 资源图
        if (typeof props.source === 'number') {
            // 本地图片 无视占位图直接使用
            status = 0;
        }
        else if (typeof props.source === 'object') {
            // 远程图片 建立下载任务, 回调中替换图片
            const uri = props.source.uri;
            Image.prefetch(uri)
                .then(()=>{
                    // success
                    this.setState({
                        status: 2
                    });
                }, error=>{
                    // error
                    this.setState({
                        status: 1
                    })
                });
            // 占位图
            if (typeof props.defaultSource === 'number') {
                // 本地占位图片
                status = 1;
            }
            else if (typeof props.defaultSource === 'object') {
                // 远程占位图片
                status = 3;
            }
            else {
                // 无占位图
            }


        }
        else {
            // 无图?

        }

        this.state = {
            status: status,
        };

    }

    render() {

        const { children, source, defaultSource } = this.props;

        let imageSource, defaultStyle;
        switch (this.state.status) {
            case -1:
            {

            }
                break;
            case 0:
            {
                imageSource = source;
            }
                break;
            case 1:
            {
                imageSource = defaultSource;
            }
                break;
            case 2:
            {
                imageSource = source;
            }
                break;
            case 3:
            {
                imageSource = defaultSource;
            }
                break;

        }
        return (
            <Image
                
                {...this.props}
                style={[{...this.props.style, resizeMode: 'contain'}]}
                source={imageSource}
            >
                {children}
            </Image>
        );
    }
}

export default PlaceholderImage;
