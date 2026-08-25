"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import AgarakFC from "#/images/sport/Agarak.png";
import GorisFC from "#/images/sport/Goris.png";
import KapanFC from "#/images/sport/Kapan.png";
import SisianFC from "#/images/sport/Sisian.png";
import MeghriFC from "#/images/sport/Meghri.png";
import KajaranFC from "#/images/sport/Kajaran.png";
import DastakertFC from "#/images/sport/Dastakert.png";

const CLUBS = [
  {
    id: 'kapan',
    name: 'Kapan',
    clubName: 'Kapan City FC',
    colors: 'Green & Gold',
    cityInfo: 'Capital of Syunik, famous for Mount Khustup.',
    image: KapanFC,
  },
  {
    id: 'goris',
    name: 'Goris',
    clubName: 'Goris City FC',
    colors: 'Blue & Gold',
    cityInfo: 'Known for its medieval cave-dwellings and stone pyramids.',
    image: GorisFC,
  },
  {
    id: 'meghri',
    name: 'Meghri',
    clubName: 'Meghri City FC',
    colors: 'Orange & Blue',
    cityInfo: 'The southernmost town, known for its warm climate and pomegranates.',
    image: MeghriFC,
  },
  {
    id: 'agarak',
    name: 'Agarak',
    clubName: 'Agarak City FC',
    colors: 'White & Gold',
    cityInfo: 'A vital border town near the Aras River.',
    image: AgarakFC,
  },
  {
    id: 'kajaran',
    name: 'Kajaran',
    clubName: 'Kajaran City FC',
    colors: 'White & Brown',
    cityInfo: 'Famous for its vast copper-molybdenum mines.',
    image: KajaranFC,
  },
  {
    id: 'sisian',
    name: 'Sisian',
    clubName: 'Sisian City FC',
    colors: 'Red & Black',
    cityInfo: 'Home to the ancient Zorats Karer monument.',
    image: SisianFC,
  },
  {
    id: 'dastakert',
    name: 'Dastakert',
    clubName: 'Dastakert City FC',
    colors: 'Purple & White',
    cityInfo: 'A small, historic town with beautiful mountainous landscapes.',
    image: DastakertFC,
  }
];

export default function YourCityClient() {

  /**
   * 
   * Your city-selector page component
   * 
   */

  const t = useTranslations('footer');
  const [joinedClub, setJoinedClub] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClubId, setSelectedClubId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleJoinClick = (clubId: string) => {
    setSelectedClubId(clubId);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedClubId) {
      setJoinedClub(selectedClubId);
    }
    setIsModalOpen(false);
    setSelectedClubId(null);
    setFormData({ name: '', email: '' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 relative overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-900/10 blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-900/10 blur-[150px]" />
        <div className="absolute top-[40%] left-[40%] w-[20vw] h-[20vw] rounded-full bg-white/5 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-24 flex flex-col items-center">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-8 shadow-2xl backdrop-blur-xl transition-transform hover:scale-105 duration-500">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]"></span>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-300">
              The Mountain will speak again
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-clip-text text-transparent bg-linear-to-b from-white via-white to-zinc-500 tracking-tighter drop-shadow-2xl uppercase">
            {t('your_city')}
          </h1>

          <h2 className="text-2xl md:text-4xl font-light text-zinc-400 mb-8 italic tracking-wide">
            "The Mountain of Syunik are quiet"
          </h2>

          <div className="w-24 h-1 bg-linear-to-r from-transparent via-orange-500 to-transparent opacity-50 mb-8" />

          <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Choose your city, represent your colors, and become a part of the legendary football clubs of your hometown.
          </p>
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {CLUBS.map((club) => {
            const isJoined = joinedClub === club.id;
            return (
              <div
                key={club.id}
                className={`group relative rounded-4xl p-1 transition-all duration-700 ease-out hover:-translate-y-2 ${isJoined
                  ? 'bg-linear-to-br from-orange-500 via-orange-900 to-black shadow-[0_0_40px_rgba(249,115,22,0.2)]'
                  : 'bg-linear-to-br from-white/10 to-transparent hover:from-white/20'
                  }`}
              >
                <div className={`relative h-full w-full rounded-[1.8rem] overflow-hidden flex flex-col ${isJoined ? 'bg-[#0a0a0a]' : 'bg-[#0a0a0a]/90 backdrop-blur-3xl'
                  }`}>

                  {/* Glowing hover effect behind image */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-orange-500/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Image Container */}
                  <div className="relative w-full aspect-4/3 flex items-center justify-center p-8 z-10">
                    <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#0a0a0a] opacity-80 z-10" />
                    <div className="relative w-full h-full z-0 transition-transform duration-700 group-hover:scale-110">
                      {/* SVG Fallback */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-700 z-0">
                        <svg className="w-16 h-16 mb-2 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <Image src={club.image} alt={club.clubName} fill className="object-contain z-10 drop-shadow-2xl" />
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="relative z-20 flex-1 flex flex-col px-8 pb-8 pt-2">
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 mb-2">
                          {club.colors}
                        </p>
                        <h3 className="text-3xl font-black tracking-tight text-white group-hover:text-orange-400 transition-colors duration-500">
                          {club.name}
                        </h3>
                      </div>
                    </div>

                    <h4 className="text-xl text-zinc-400 font-medium mb-3">
                      {club.clubName}
                    </h4>

                    <div className="mb-8 space-y-1">
                      <div className="w-12 h-px bg-orange-500/50 mb-3" />
                      <p className="text-sm text-zinc-500 font-light leading-relaxed line-clamp-2">
                        {club.cityInfo}
                      </p>
                    </div>

                    <div className="mt-auto pt-6 border-t border-white/5">
                      <button
                        onClick={() => handleJoinClick(club.id)}
                        disabled={isJoined}
                        className={`relative w-full py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-sm transition-all duration-500 overflow-hidden ${isJoined
                          ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30 cursor-default'
                          : 'bg-white text-black hover:bg-zinc-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                          }`}
                      >
                        <span className="relative z-10">
                          {isJoined ? 'Official Member' : 'Join Club'}
                        </span>
                        {!isJoined && (
                          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Join Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity">
          <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl w-full max-w-md relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <h3 className="text-3xl font-black mb-2 text-white">Join the Club</h3>
            <p className="text-zinc-400 mb-8 text-sm">
              Enter your details to become an official member of <span className="text-orange-400 font-bold">{CLUBS.find(c => c.id === selectedClubId)?.clubName}</span>.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="e.g. Aram Khachatryan"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="aram@example.com"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold uppercase tracking-[0.2em] text-sm py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] active:scale-95"
              >
                Confirm & Join
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
