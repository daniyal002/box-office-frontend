import { IOrderImage } from "@/interface/order";
import { Image } from "antd";

interface Props {
  img: IOrderImage;
}

const OpenImage = ({ img }: Props) => {
  return (
    <>
      <Image
        width={200}
        src={`http://192.168.30.119:3002/${img.image_src.replace(/\\/g, "/")}`}
      />
    </>
  );
};

export default OpenImage;
