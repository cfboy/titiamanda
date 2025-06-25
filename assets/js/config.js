// Configuration file for Titi Amanda website
const WEBSITE_CONFIG = {
    services: [
        {
            id: 'at-home-care',
            icon: 'fa-home',
            title: 'At Home Care',
            description: 'Personalized childcare in the comfort of your home. I provide a safe, engaging, and nurturing environment tailored to your child\'s routine.',
            idealFor: [
                'Families living in Puerto Rico',
                'Parents who work from home',
                'Date nights or special events'
            ],
            color: 'pink',
            delay: 0.3
        },
        {
            id: 'hotel-vacation',
            icon: 'fa-suitcase',
            title: 'Hotel & Vacation Babysitting',
            description: 'Trusted babysitting while you enjoy your vacation or a night out. I bring age-appropriate activities and ensure your little ones feel safe and entertained.',
            idealFor: [
                'Tourists and travelers',
                'Destination weddings or events',
                'Resort and hotel stays'
            ],
            color: 'blue',
            delay: 0.4
        },
        {
            id: 'special-needs',
            icon: 'fa-heart',
            title: 'Special Needs Support',
            description: 'Compassionate care tailored to children with autism and other developmental needs, incorporating visual supports and sensory-friendly activities.',
            idealFor: [
                'Children with autism or developmental delays',
                'Families needing experienced, trained care'
            ],
            color: 'orange',
            delay: 0.5
        },
        {
            id: 'family-outing',
            icon: 'fa-users',
            title: 'Family Outing Support',
            description: 'Extra hands and heart while you\'re out and about. I accompany families during outings to provide calm, professional assistance.',
            idealFor: [
                'Families with multiple children',
                'Parents attending events',
                'Errands or special plans'
            ],
            color: 'green',
            delay: 0.6
        }
    ],

    features: [
        {
            id: 'reading-time',
            icon: 'fa-book',
            emoji: '📚',
            title: 'Reading Time',
            description: 'We explore books together to build language skills, spark imagination, and create calm moments.',
            color: 'pink',
            delay: 0.1
        },
        {
            id: 'arts-crafts',
            icon: 'fa-paint-brush',
            emoji: '🎨',
            title: 'Arts & Crafts',
            description: 'Creative time using age-appropriate materials to support fine motor skills and self-expression.',
            color: 'blue',
            delay: 0.2
        },
        {
            id: 'sensory-playtime',
            icon: 'fa-puzzle-piece',
            emoji: '🧩',
            title: 'Sensory & Playtime',
            description: 'Structured and free play using toys, music, sensory bins, or imaginative games to support learning.',
            color: 'orange',
            delay: 0.3
        },
        {
            id: 'meal-support',
            icon: 'fa-cutlery',
            emoji: '🍎',
            title: 'Meal & Snack Support',
            description: 'I help with feeding routines, encourage independence, and ensure safe, clean, and enjoyable mealtimes.',
            color: 'green',
            delay: 0.4
        },
        {
            id: 'routines-transitions',
            icon: 'fa-clock-o',
            emoji: '🚿',
            title: 'Routines & Transitions',
            description: 'Support with daily routines such as hand washing, diapering, clean-up, naptime, or bedtime.',
            color: 'purple-500',
            delay: 0.5
        },
        {
            id: 'outdoor-play',
            icon: 'fa-tree',
            emoji: '🌳',
            title: 'Outdoor Play',
            description: 'Time outside in fresh air for movement, exploration, and physical activity—when space and weather allow.',
            color: 'green',
            delay: 0.6
        },
        {
            id: 'emotional-support',
            icon: 'fa-heart',
            emoji: '🤝',
            title: 'Emotional Support',
            description: 'Gentle guidance to help children feel safe, regulated, and confident during activities and transitions.',
            color: 'pink',
            delay: 0.7
        },
        {
            id: 'safety-supervision',
            icon: 'fa-shield',
            emoji: '🧡',
            title: 'Safety & Supervision',
            description: 'I prioritize your child\'s well-being at all times with close supervision, clear boundaries, and safe environments.',
            color: 'blue',
            delay: 0.8
        }
    ]
};

// Component rendering functions
const ComponentRenderer = {

    // Render service card
    renderServiceCard: function (service) {
        return `
      <div
        class="service-card group wow fadeInUp bg-white rounded-[50px] p-8 border border-gray-100 transition-all duration-500 hover:shadow-xl hover:border-transparent hover:-translate-y-2"
        data-wow-duration="1s" data-wow-delay="${service.delay}s">
        <div class="text-center">
          <!-- Icon -->
          <div
            class="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-${service.color}/10 to-${service.color}/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <i class="fa fa-2x ${service.icon} text-2xl text-${service.color} transition-colors duration-500"></i>
          </div>

          <!-- Title -->
          <h4 class="text-xl font-bold text-gray-dark mb-4 group-hover:text-${service.color} transition-colors duration-500">
            ${service.title}
          </h4>

          <!-- Description -->
          <p class="text-gray-600 leading-relaxed text-sm mb-4">
            ${service.description}
          </p>

          <!-- Ideal For -->
          <div class="text-left text-xs text-gray-500 space-y-1">
            <p class="font-semibold text-gray-600">Ideal for:</p>
            ${service.idealFor.map(item => `<p>• ${item}</p>`).join('')}
          </div>
        </div>
      </div>
    `;
    },

    // Render feature card
    renderFeatureCard: function (feature) {
        return `
      <div class="mb-4 md:mb-0 h-full group">
        <!-- Invisible wrapper to contain card + floating icon -->
        <div class="relative pt-8 h-full">
          <!-- Floating Icon -->
          <div class="absolute top-0 left-1/2 transform -translate-x-1/2 z-10">
            <div
              class="w-16 h-16 bg-gradient-to-br from-white to-cream rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
              <i class="fa fa-2x ${feature.icon} text-2xl text-${feature.color} transition-all duration-500"></i>
            </div>
          </div>
          
          <!-- Card -->
          <div
            class="features-item wow fadeInUp text-center p-8 pt-16 rounded-[50px] bg-white transition-all duration-500  hover:shadow-xl hover:border-transparent hover:-translate-y-2 group relative h-full min-h-[320px]"
            data-wow-duration="1s" data-wow-delay="${feature.delay}s">
            <h4
              class="mx-4 mt-4 text-xl leading-7 font-bold text-gray-dark relative transition-all duration-500 ">
              ${feature.title.split(' ').slice(0, -1).join(' ')}
              <br />
              ${feature.title.split(' ').slice(-1)}
            </h4>
            <div
              class="line-dec w-24 h-0.5 bg-${feature.color} bg-opacity-30 mx-auto my-6 transition-all duration-500 group-hover:bg-blue">
            </div>
            <p class="relative mt-0 transition-all duration-500 ">
              ${feature.description}
            </p>
          </div>
        </div>
      </div>
    `;
    },

    // Render all services
    renderServices: function () {
        return WEBSITE_CONFIG.services.map(service => this.renderServiceCard(service)).join('');
    },

    // Render all features
    renderFeatures: function () {
        return WEBSITE_CONFIG.features.map(feature => this.renderFeatureCard(feature)).join('');
    }
};

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Render services
    const servicesContainer = document.getElementById('services-container');
    if (servicesContainer) {
        servicesContainer.innerHTML = ComponentRenderer.renderServices();
    }

    // Render features
    const featuresContainer = document.getElementById('features-container');
    if (featuresContainer) {
        featuresContainer.innerHTML = ComponentRenderer.renderFeatures();
    }
});
