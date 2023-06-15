import { useParams } from "react-router-dom";
import { DetailOrder } from "../../components/templates/DetailOrder.tsx";
import { CameraComponent } from "../../components/organisms/Camera.tsx";

export function CameraReact() {
  const { orderId } = useParams<{ orderId: string }>();

  return (
    <div className="grid grid-cols-2">
      <div>
        <DetailOrder id={Number(orderId)} />
      </div>
      <CameraComponent orderId={Number(orderId)} />
    </div>
  );
}
