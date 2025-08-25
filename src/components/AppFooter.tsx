'use client';

import Link from 'next/link';
// --- PERUBAHAN: Menambahkan import untuk ikon Admin ---
import { FaGithub, FaXTwitter, FaUserShield, FaDiscord } from 'react-icons/fa6';

type FooterLink = {
  href: string;
  label: string;
  isExternal?: boolean;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

const AppFooter = () => {
  const footerLinks: FooterColumn[] = [
    {
      title: 'Useful Links',
      links: [
        { href: '/swap', label: 'Swap' },
        { href: '/deploy', label: 'Deploy' },
        { href: '/send', label: 'Send' },
        { href: '/faucet', label: 'Faucet' },
        { href: '/', label: 'Home' },
      ],
    },
    {
      title: 'Recommended Links',
      links: [
        { href: 'https://fun-quiz.fun', label: 'FunQuiz', isExternal: true },
        { href: 'https://fungive.lrmn.link', label: 'FunGive', isExternal: true },
        { href: 'https://somfeed.lrmn.link', label: 'Somfeed', isExternal: true },
        { href: 'https://somnia.lrmn.link', label: 'More Dapps', isExternal: true },
      ],
    },
  ];

  const socialLinks = [
    { href: 'https://github.com/lrmn7', label: 'GitHub', icon: <FaGithub /> },
    { href: 'https://discord.com/invite/9HkKkkA9Jt', label: 'Discord', icon: <FaDiscord /> },
    { href: 'https://x.com/romanromannya', label: 'Twitter', icon: <FaXTwitter /> },
    { href: '/admin', label: 'Admin', icon: <FaUserShield /> },
  ];

  return (
    <footer className="bg-brand-dark border-t-2 border-black p-8 mt-16">
      <div className="container mx-auto text-brand-gray">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mb-8">
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-pixel text-brand-orange mb-3 inline-block">
              SOMT👀L
            </Link>
            <p className="text-sm max-w-xs">
              Dive into Somnia Testnet: Everything You Need, Made Playful.
            </p>
          </div>
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h2 className="font-pixel text-lg mb-4">{column.title}</h2>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.isExternal ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-brand-orange transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="hover:text-brand-orange transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-b border-stone-700 my-8"></div>
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-6">
          <div className="text-sm text-center sm:text-left">
            <p>✦ born from silence, built with purpose ✦</p>
            <p className="mt-1">Built with 💛 by Somnia Community</p>
          </div>

          <div className="flex items-center gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                // Jika ini link internal, Anda mungkin tidak ingin target="_blank"
                // Tapi untuk menjaga konsistensi dengan permintaan, saya biarkan
                target={social.label !== 'Admin' ? '_blank' : '_self'}
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-2xl hover:text-brand-orange transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;