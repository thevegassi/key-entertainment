import { notFound } from 'next/navigation';

// Любой неизвестный URL внутри /<locale>/ отдаёт 404 с шапкой/подвалом сайта.
export default function CatchAll() {
  notFound();
}
