import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from '@/context/LanguageContext'

const values = [
  { title: 'Compassion', desc: 'We lead with empathy and care for every child.' },
  { title: 'Integrity', desc: 'Transparency and accountability in all we do.' },
  { title: 'Hope', desc: 'Believing in a brighter future for every child.' },
  { title: 'Community', desc: 'Building strong, supportive networks.' },
]

const timeline = [
  { year: '2024', event: 'Expanded healthcare initiatives to 5 new communities' },
  { year: '2023', event: 'Launched education support program for 200+ children' },
  { year: '2022', event: 'Opened new shelter facility in Nablus' },
  { year: '2020', event: 'Food security program reached 500 families' },
  { year: '2015', event: 'Official registration with Ministry of Social Development' },
  { year: '2010', event: 'AHPC founded - First community outreach programs' },
]

export function About() {
  const { t } = useLanguage()

  return (
    <>
      <Helmet>
        <title>{t('about')} - {t('organizationName')}</title>
        <meta name="description" content={`${t('ourStory')} - ${t('organizationName')}`} />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="container-custom px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading font-bold text-4xl md:text-5xl text-dark mb-4"
          >
            {t('about')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl"
          >
            {t('organizationName')} - جمعية إسعاد الطفل الفلسطيني
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading font-bold text-3xl text-dark mb-4">
                {t('ourStory')}
              </h2>
              <p className="text-gray-600 mb-4">
                AHPC is a cultural and educational charitable organization licensed by the Ministry of Interior 
                and Ministry of Social Development. Based in Askar Old Camp, Nablus, Palestine, we have been 
                serving orphan children and their families for over a decade.
              </p>
              <p className="text-gray-600">
                Our work focuses on providing education support, healthcare initiatives, shelter programs, 
                and food security to ensure every child has the opportunity to thrive despite difficult circumstances.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-card overflow-hidden shadow-card"
            >
              <img
                src="/placeholder.jpg"
                alt="AHPC team"
                className="w-full h-80 object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-light">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-bold text-3xl text-dark mb-12 text-center"
          >
            {t('missionVision')}
          </motion.h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-card shadow-card"
            >
              <h3 className="font-heading font-semibold text-xl text-primary mb-2">Mission</h3>
              <p className="text-gray-600">
                To support orphan children in Palestine with comprehensive programs in education, 
                healthcare, shelter, and food security, enabling them to build hopeful futures.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-card shadow-card"
            >
              <h3 className="font-heading font-semibold text-xl text-primary mb-2">Vision</h3>
              <p className="text-gray-600">
                A Palestine where every orphan child has access to quality education, healthcare, 
                and a safe environment to grow and flourish.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-bold text-3xl text-dark mb-12 text-center"
          >
            {t('ourValues')}
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-card shadow-card text-center hover:shadow-card-hover transition-shadow"
              >
                <div className="text-3xl mb-2">❤️</div>
                <h3 className="font-heading font-semibold text-lg text-dark">{v.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-light">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-bold text-3xl text-dark mb-12 text-center"
          >
            {t('achievements')}
          </motion.h2>
          <div className="max-w-2xl mx-auto">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-4 mb-6"
              >
                <div className="flex-shrink-0 w-20 text-primary font-bold">{item.year}</div>
                <div className="flex-1 bg-white p-4 rounded-card shadow-card">
                  {item.event}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
