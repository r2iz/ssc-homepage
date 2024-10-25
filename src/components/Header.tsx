import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return(
        <header className="text-primary-foreground p-4 mt-2">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <Image src={"/logo_seikogakuin.jpg"} alt='聖光学院のロゴ' height={75} width={75}></Image>
                    <h1 className="text-2xl font-bold text-gray-800 ml-4">聖光学院 生徒会</h1>
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        <li><Link href="/" className="text-gray-800 hover:underline">ホーム</Link></li>
                        <li><Link href="/introduction" className="text-gray-800 hover:underline">紹介</Link></li>
                        <li><Link href="/activities" className="text-gray-800 hover:underline">活動</Link></li>
                        <li><Link href="/news" className="text-gray-800 hover:underline">ニュース</Link></li>
                        <li><Link href="/others" className="text-gray-800 hover:underline">その他</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}