import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Footer() {
    return(
        <footer className="bg-muted mt-12 py-6">
            <div className="container mx-auto text-center">
                <p>&copy; 2024 聖光学院中学校高等学校 生徒会. All rights reserved.</p>
                <Button variant="link" asChild>
                    <Link href="https://www.seiko.ac.jp/">学校公式サイト</Link>
                </Button>
            </div>
        </footer>
    );
}