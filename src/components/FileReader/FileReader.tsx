import React from "react";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import style from "./FileReader.module.scss";
import OpenImage from "../OpenImage/OpenImage";
import { IOrderImage } from "@/interface/order";
import { baseURL } from "@/api/interseptors";

const isImage = (url: string) => {
  const imageFormats = /\.(jpeg|jpg|png|gif|bmp|svg|ico)$/i;
  return imageFormats.test(url);
};

const cleanPath = (path: string) => path.replace(/^uploads\\/, "");

const getFileName = (url: string) => {
  const cleanedUrl = cleanPath(url);
  return cleanedUrl.split("/").pop() || "file";
};



const FileRenderer = ({ fileUrl }: { fileUrl: IOrderImage }) => {
  if (isImage(fileUrl.image_src)) {
    return (
      <div className={style.imageContainer}>
        <OpenImage img={fileUrl} />
      </div>
    );
  }

  return (
    <div className={style.fileContainer}>
        <p title={fileUrl.image_src}>{fileUrl.image_src}</p>
      <Button
        type="primary"
        icon={<DownloadOutlined />}
        href={`${baseURL}/uploads/${getFileName(fileUrl.image_src)}`}
        target="_blank"
        download={getFileName(fileUrl.image_src)}
      >
        Скачать файл
      </Button>
    </div>
  );
};


export default FileRenderer;
