import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'classe',
        loadChildren: () => import('./classe/classe/classe.module').then(m => m.ClasseClasseModule),
      },
      {
        path: 'niveau',
        loadChildren: () => import('./classe/niveau/niveau.module').then(m => m.ClasseNiveauModule),
      },
      {
        path: 'matiere',
        loadChildren: () => import('./classe/matiere/matiere.module').then(m => m.ClasseMatiereModule),
      },
      {
        path: 'batiment',
        loadChildren: () => import('./immoblier/batiment/batiment.module').then(m => m.ImmoblierBatimentModule),
      },
      {
        path: 'salle',
        loadChildren: () => import('./immoblier/salle/salle.module').then(m => m.ImmoblierSalleModule),
      },
      {
        path: 'paiement',
        loadChildren: () => import('./paiement/paiement/paiement.module').then(m => m.PaiementPaiementModule),
      },
      {
        path: 'mois',
        loadChildren: () => import('./paiement/mois/mois.module').then(m => m.PaiementMoisModule),
      },
      {
        path: 'annee',
        loadChildren: () => import('./inscription/annee/annee.module').then(m => m.InscriptionAnneeModule),
      },
      {
        path: 'eleve',
        loadChildren: () => import('./inscription/eleve/eleve.module').then(m => m.InscriptionEleveModule),
      },
      {
        path: 'tuteur',
        loadChildren: () => import('./inscription/tuteur/tuteur.module').then(m => m.InscriptionTuteurModule),
      },
      {
        path: 'inscription',
        loadChildren: () => import('./inscription/inscription/inscription.module').then(m => m.InscriptionInscriptionModule),
      },
      {
        path: 'evaluation',
        loadChildren: () => import('./evaluation/evaluation/evaluation.module').then(m => m.EvaluationEvaluationModule),
      },
      {
        path: 'trimestre',
        loadChildren: () => import('./evaluation/trimestre/trimestre.module').then(m => m.EvaluationTrimestreModule),
      },
      {
        path: 'note',
        loadChildren: () => import('./evaluation/note/note.module').then(m => m.EvaluationNoteModule),
      },
      {
        path: 'cantine',
        loadChildren: () => import('./cantine/cantine/cantine.module').then(m => m.CantineCantineModule),
      },
      {
        path: 'groupe-cantine',
        loadChildren: () => import('./cantine/groupe-cantine/groupe-cantine.module').then(m => m.CantineGroupeCantineModule),
      },
      {
        path: 'bus',
        loadChildren: () => import('./transport/bus/bus.module').then(m => m.TransportBusModule),
      },
      {
        path: 'chauffeur',
        loadChildren: () => import('./transport/chauffeur/chauffeur.module').then(m => m.TransportChauffeurModule),
      },
      {
        path: 'groupe-transport',
        loadChildren: () => import('./transport/groupe-transport/groupe-transport.module').then(m => m.TransportGroupeTransportModule),
      },
      {
        path: 'zone',
        loadChildren: () => import('./transport/zone/zone.module').then(m => m.TransportZoneModule),
      },
      {
        path: 'programme-transport',
        loadChildren: () =>
          import('./transport/programme-transport/programme-transport.module').then(m => m.TransportProgrammeTransportModule),
      },
      {
        path: 'profile-util',
        loadChildren: () => import('./utilisateur/profile-util/profile-util.module').then(m => m.UtilisateurProfileUtilModule),
      },
      {
        path: 'utilisateur',
        loadChildren: () => import('./utilisateur/utilisateur/utilisateur.module').then(m => m.UtilisateurUtilisateurModule),
      },
      {
        path: 'service-util',
        loadChildren: () => import('./utilisateur/service-util/service-util.module').then(m => m.UtilisateurServiceUtilModule),
      },
      {
        path: 'absence',
        loadChildren: () => import('./cours/absence/absence.module').then(m => m.CoursAbsenceModule),
      },
      {
        path: 'cours',
        loadChildren: () => import('./cours/cours/cours.module').then(m => m.CoursCoursModule),
      },
      {
        path: 'horaire',
        loadChildren: () => import('./cours/horaire/horaire.module').then(m => m.CoursHoraireModule),
      },
      {
        path: 'enseignant',
        loadChildren: () => import('./cours/enseignant/enseignant.module').then(m => m.CoursEnseignantModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class GatewayEntityModule {}
