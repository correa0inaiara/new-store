import Image from "next/image";

export default function Welcome() {
    return (
        <div>
            <Image
                src="/gift-box.png"
                alt="Image of a Gift Box in gradient purple wrapped gradient yellow ribbons"
                width={100}
                height={100}
            />
            <p>
                Seja muito bem-vindo(a)!
            </p>
            <p>
                Presente de boas-vindas:
            </p>
            <p>
                10% OFF na primeira compra
            </p>
        </div>
    )
}